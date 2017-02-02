var app = angular.module('nfl', ['ui.bootstrap','ngResource']);

app.factory('Team', ['$resource', function ($resource) {
	return $resource('http://localhost:8080/nfl-1/teams/:teamId', {teamId: '@tid'},
		{
			updateTeam: {method: 'PUT'}
		}
    );
}]);

app.controller('NflController', ['$scope', '$window', 'Team', function($scope, $window, Team) {
    var ob = this;
    var round1Counter = 0;
    var round2Counter = 0;
    ob.teams=[];
    ob.team1 = new Team();
    ob.team2 = new Team();
    $scope.gameOver = false;
    $scope.round1 = false;
    $scope.round2 = false;
    $scope.round3 = false;
    $scope.round1Done = false;
    $scope.round2Done = false;
    $scope.round3Done = false;
    $scope.gameTimeButton = "Game Time";
    $scope.team1Won = false;
    $scope.team2Won = false;
    ob.fetchAllTeams = function(){       
        ob.teams = Team.query();   
    };
    ob.fetchAllTeams();
    ob.addTeam = function(){
        console.log('Inside save');
        ob.team1.$save(function(team) {
        console.log(team1);
        ob.reset(); 
        ob.fetchAllTeams();
        },
        function(err) {
            console.log(err.status);
            ob.flag='failed';
        });
    }; 
   
    ob.deleteTeam = function(id){
        console.log('Inside delete');
        ob.team1 = Team.delete({ teamId:id }, function() { 
            ob.flag = 'deleted';
            ob.fetchAllTeams(); 
        });
    };

    ob.gameTime = function(id1, id2, round) {
        $scope.play = true;
        $window.scrollTo(0, 0);
        console.log('Inside play');
        ob.team1 = Team.get({ teamId:id1 }, function() {
        });
        ob.team2 = Team.get({ teamId:id2 }, function() {
        });
        if(round == 1) {
            ob.team1.roundPlayed = 1;
            ob.team2.roundPlayed = 1;
            $scope.round1 = true;
        }
        else if(round == 2) {
            ob.team1.roundPlayed = 2;
            ob.team2.roundPlayed = 2;
            $scope.round2 = true;
        }
        else {
            ob.team1.roundPlayed = 3;
            ob.team2.roundPlayed = 3;
            $scope.round3 = true;
        }
        console.log("ob.team1.roundPlayed " + ob.team1.roundPlayed);
        console.log("ob.team2.roundPlayed " + ob.team2.roundPlayed);
        console.log("---------------");
    };

    ob.saveResult = function() {
        console.log("inside saveResult")
        ob.team1.round1Score = Math.floor(Math.random() * ((ob.team1.average-0)+1) + 0);
        ob.team2.round1Score = Math.floor(Math.random() * ((ob.team2.average-0)+1) + 0);
        ob.team1.roundPlayed = 1;
        ob.team2.roundPlayed = 1;
        if(ob.team1.round1Score != ob.team2.round1Score) {
            ob.team1.$updateTeam(function(team1) {
            console.log(team1);
            ob.fetchAllTeams();
            });
            ob.team2.$updateTeam(function(team2) {
            console.log(team2);
            ob.fetchAllTeams();
            });
            if(ob.team1.round1Score < ob.team2.round1Score) {
                ob.team1.go = 0;
                $scope.team1Won = false;
                $scope.team2Won = true;
                ob.team1.$updateTeam(function(team1) {
                });
            }
            else {
                $scope.team1Won = true;
                $scope.team2Won = false;
            }
            $scope.play = false;
            //$scope.gameOver = true;
            $scope.tieBreakerGame = false;
            $scope.gameTimeButton = "Game Time";
            ob.fetchAllTeams();
        }
        else {
            $scope.gameTimeButton = "Tie Breaker";
            $scope.tieBreakerGame = true;
            ob.fetchAllTeams();
        }
        console.log("ob.team1.roundPlayed " + ob.team1.roundPlayed);
        console.log("ob.team2.roundPlayed " + ob.team2.roundPlayed);
    };

    ob.startOver = function() {
        this.round1Counter = 0;
        this.round2Counter = 0;
        this.round3Counter = 0;
        var team = new Team();
        $scope.round1Done = false;
        $scope.round2Done = false;
        $scope.round3Done = false;
        team.round1Score = 0;
        team.round2Score = 0;
        team.round3Score = 0;
        team.go = 1;
        team.$updateTeam(function(team) {
            ob.fetchAllTeams();
        });
    };

}]);