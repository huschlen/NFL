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
    ob.teams = [];
    ob.myTeam = new Team();
    ob.team1 = new Team();
    ob.team2 = new Team();
    $scope.round1Done = false;
    $scope.round2Done = false;
    $scope.gameOver = false;
    $scope.gameTimeButton = "Game Time";
    $scope.team1Won = false;
    $scope.team2Won = false;
    var numOfDivisionalRoundGames = 0;
    var numOfConferenceChampionshipGames = 0;
    var arrayDivisionalRoundGames = [];
    var arrayConferenceChampionshipGames = [];
    var indexRound1;
    var indexRound2;
    ob.fetchAllTeams = function(){       
        ob.teams = Team.query();   
    };
    ob.fetchAllTeams();
    ob.addTeam = function(){
        console.log('Inside save');
        ob.team1.$save(function(team1) {
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
            ob.reset();
            ob.flag = 'deleted';
            ob.fetchAllTeams(); 
        });
    };

    ob.play = function(id1, id2, round, buttonId) {
        $scope.team1Won = false;
        $scope.team2Won = false;
        $scope.play = true;
        $scope.gameOver = false;
        $window.scrollTo(0, 0);
        
        if(round == 1) {
            indexRound1 = arrayDivisionalRoundGames.indexOf(buttonId);
            if(indexRound1 < 0) {
                arrayDivisionalRoundGames.push(buttonId);
            }
        }
        if(round == 2) {
            indexRound2 = arrayConferenceChampionshipGames.indexOf(buttonId);
            if(indexRound2 < 0) {
                arrayConferenceChampionshipGames.push(buttonId);
            }
        }
        
        
        console.log("buttonId " + buttonId);

        $window.document.getElementById(buttonId).disabled = true;

        ob.myTeam = Team.get({ teamId:id1 }, function() {
        });
        ob.team1 = Team.get({ teamId:id1 }, function() {
        });
        ob.team2 = Team.get({ teamId:id2 }, function() {
        });
        
        console.log("inside gameTime ob.team1.name "  + ob.team1.name);
        console.log("inside gameTime ob.myTeam.name "  + ob.myTeam.name);
        if(round == 1) {
            ob.team1.roundPlayed = 1;
            ob.team2.roundPlayed = 1;
        }
        else if(round == 2) {
            ob.team1.roundPlayed = 2;
            ob.team2.roundPlayed = 2;
        }
        else {
            ob.team1.roundPlayed = 3;
            ob.team2.roundPlayed = 3;
        }
    };

    ob.saveResult = function() {
        if(arrayDivisionalRoundGames.length == 4) {
            $scope.round1Done = true;
        }
        if(arrayConferenceChampionshipGames.length == 2) {
            $scope.round2Done = true;
        }
        $window.document.getElementById('round10').disabled = true;
        console.log("inside saveResult");
        console.log("***ob.myTeam.name "+ob.myTeam.name);
        console.log("***ob.team1.name "+ob.team1.name);
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
                    //ob.fetchAllTeams();
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
        var myTeamId = 1;
        ob.myTeam = Team.get({ teamId:myTeamId }, function() {
        });
        
        ob.myTeam.round1Score = 0;
        ob.myTeam.round2Score = 0;
        ob.myTeam.round3Score = 0;
        ob.myTeam.go = 1;
        ob.myTeam.roundPlayed = 0;
        ob.myTeam.$updateTeam(function(myTeam) { 
        });
    };

    ob.startOver = function() {
        ob.fetchAllTeams();
        var myId = 1;
        ob.myTeam = Team.get({ teamId:myId }, function() {
            });
            ob.myTeam.round1Score = 0;
            ob.myTeam.round2Score = 0;
            ob.myTeam.round3Score = 0;
            ob.myTeam.go = 1;
            ob.myTeam.roundPlayed = 0;
            ob.myTeam.$updateTeam(function(myTeam) {
            
            ob.fetchAllTeams();
            });

    };

}]);