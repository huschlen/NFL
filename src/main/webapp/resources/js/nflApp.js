var app = angular.module('nfl', ['ui.bootstrap', 'ngResource']);

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
    var divisionalRound = false;
    var conferenceChampionship = false;
    var superBowl = false;
    var numOfDivisionalRoundGames = 0;
    var numOfConferenceChampionshipGames = 0;
    var arrayDivisionalRoundGames = [];
    var arrayConferenceChampionshipGames = [];
    var indexRound1 = -1;
    var indexRound2 = -1;
    $scope.round1Done = false;
    $scope.round2Done = false;
    $scope.gameOver = false;
    $scope.gameTimeButton = "Game Time";
    $scope.team1Won = false;
    $scope.team2Won = false;
    $scope.thisTeam = {
        tid: ""
    };
    $scope.thatTeam = {
        tid: ""
    };

    ob.fetchAllTeams = function(){       
        ob.teams = Team.query();   
    };

    ob.fetchAllTeams();

    ob.addTeam = function(){
        console.log('Inside addTeam');
        ob.myTeam.$save(function(myTeam) {
        console.log(myTeam);
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
        ob.myTeam = Team.delete({ teamId:id }, function() {
            ob.reset();
            ob.flag = 'deleted';
            ob.fetchAllTeams(); 
        });
    };

    ob.play = function(id1, id2, round, buttonId) {
        console.log("id1" + id1);
        console.log("id2" + id2);
        $scope.team1Won = false;
        $scope.team2Won = false;
        $scope.play = true;
        $scope.gameOver = false;
        $window.scrollTo(0, 0);
        $window.document.getElementById(buttonId).disabled = true;
        if(round == 1) {
            divisionalRound = true;
            indexRound1 = arrayDivisionalRoundGames.indexOf(buttonId);
            if(indexRound1 < 0) {
                arrayDivisionalRoundGames.push(buttonId);
            }
        }
        if(round == 2) {
            conferenceChampionship = true;
            indexRound2 = arrayConferenceChampionshipGames.indexOf(buttonId);
            if(indexRound2 < 0) {
                arrayConferenceChampionshipGames.push(buttonId);
            }
        }
        if(round == 3) {
            superBowl = true;
        }  
        console.log("buttonId " + buttonId);

        $window.document.getElementById(buttonId).disabled = true;
        ob.team1 = Team.get({ teamId:id1 }, function() {
        });
        ob.team2 = Team.get({ teamId:id2 }, function() {
        });

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

    ob.playConferenceChampionship = function(thisTeam, thatTeam) {
        console.log("inside playConferenceChampionship");
        console.log(thisTeam);
        console.log(thatTeam);
        $scope.thisTeam = thisTeam;
        $scope.thatTeam = thatTeam;
        ob.play($scope.thisTeam.tid, $scope.thatTeam.tid, 2, 'round2Game1');
    }

    ob.saveResult = function() {
        if(arrayDivisionalRoundGames.length == 4) {
            $scope.round1Done = true;
        }
        if(arrayConferenceChampionshipGames.length == 2) {
            $scope.round2Done = true;
        }
        if (divisionalRound == true) {
            ob.team1.round1Score = Math.floor(Math.random() * ((ob.team1.average-0)+1) + 0);
            ob.team2.round1Score = Math.floor(Math.random() * ((ob.team2.average-0)+1) + 0);
            ob.team1.roundPlayed = 1;
            ob.team2.roundPlayed = 1;
            if((ob.team1.round1Score < ob.team2.round1Score) && (ob.team1.round1Score != ob.team2.round1Score)) {
                ob.team1.go = 0;
                $scope.team1Won = false;
                $scope.team2Won = true;
                ob.team1.$updateTeam(function(team1) {
                console.log(team1);
                ob.fetchAllTeams();
                });
                ob.team2.$updateTeam(function(team2) {
                console.log(team2);
                ob.fetchAllTeams();
                });
                $scope.play = false;
                //$scope.gameOver = true;
                $scope.tieBreakerGame = false;
                $scope.gameTimeButton = "Game Time";
                ob.fetchAllTeams();
            }
            else if(ob.team1.round1Score > ob.team2.round1Score) {
                $scope.team1Won = true;
                $scope.team2Won = false;
            }
            else {
                $scope.gameTimeButton = "Tie Breaker";
                $scope.tieBreakerGame = true;
                ob.fetchAllTeams();
            }
        }
        if (conferenceChampionship == true) {
            ob.team1.round2Score = Math.floor(Math.random() * ((ob.team1.average-0)+1) + 0);
            ob.team2.round2Score = Math.floor(Math.random() * ((ob.team2.average-0)+1) + 0);
            ob.team1.roundPlayed = 2;
            ob.team2.roundPlayed = 2;
            if((ob.team1.round2Score < ob.team2.round2Score) && (ob.team1.round2Score != ob.team2.round2Score)) {
                ob.team1.go = 0;
                $scope.team1Won = false;
                $scope.team2Won = true;
                ob.team1.$updateTeam(function(team1) {
                console.log(team1);
                ob.fetchAllTeams();
                });
                ob.team2.$updateTeam(function(team2) {
                console.log(team2);
                ob.fetchAllTeams();
                });
                $scope.play = false;
                //$scope.gameOver = true;
                $scope.tieBreakerGame = false;
                $scope.gameTimeButton = "Game Time";
                ob.fetchAllTeams();
            }
            else if(ob.team1.round2Score > ob.team2.round2Score) {
                $scope.team1Won = true;
                $scope.team2Won = false;
            }
            else {
                $scope.gameTimeButton = "Tie Breaker";
                $scope.tieBreakerGame = true;
                ob.fetchAllTeams();
            }
        }
        if (superBowl == true) {
            ob.team1.round3Score = Math.floor(Math.random() * ((ob.team1.average-0)+1) + 0);
            ob.team2.round3Score = Math.floor(Math.random() * ((ob.team2.average-0)+1) + 0);
            ob.team1.roundPlayed = 3;
            ob.team2.roundPlayed = 3;
            if((ob.team1.round3Score < ob.team2.round3Score) && (ob.team1.round3Score != ob.team2.round3Score)) {
                ob.team1.go = 0;
                $scope.team1Won = false;
                $scope.team2Won = true;
                ob.team1.$updateTeam(function(team1) {
                console.log(team1);
                ob.fetchAllTeams();
                });
                ob.team2.$updateTeam(function(team2) {
                console.log(team2);
                ob.fetchAllTeams();
                });
                $scope.play = false;
                //$scope.gameOver = true;
                $scope.tieBreakerGame = false;
                $scope.gameTimeButton = "Game Time";
                ob.fetchAllTeams();
            }
            else if(ob.team1.round3Score > ob.team2.round3Score) {
                $scope.team1Won = true;
                $scope.team2Won = false;
            }
            else {
                $scope.gameTimeButton = "Tie Breaker";
                $scope.tieBreakerGame = true;
                ob.fetchAllTeams();
            }
        }
    };

    ob.startOver = function() {
        //this.ob = this;
        this.round1Counter = 0;
        this.round2Counter = 0;
        ob.teams = [];
        ob.myTeam = new Team();
        ob.team1 = new Team();
        ob.team2 = new Team();
        divisionalRound = false;
        conferenceChampionship = false;
        this.numOfDivisionalRoundGames = 0;
        this.numOfConferenceChampionshipGames = 0;
        this.arrayDivisionalRoundGames = [];
        this.arrayConferenceChampionshipGames = [];
        this.indexRound1 = -1;
        this.indexRound2 = -1;
        $scope.round1Done = false;
        $scope.round2Done = false;
        $scope.gameOver = false;
        $scope.gameTimeButton = "Game Time";
        $scope.team1Won = false;
        $scope.team2Won = false;
        //$scope.index = $route.current.params.index;
        //ob.fetchAllTeams();
        //var myId = 1;
        /*ob.myTeam = Team.get({ teamId:myId }, function() 
            });
        ob.myTeam.round1Score = 0;
        ob.myTeam.round2Score = 0;
        ob.myTeam.round3Score = 0;
        ob.myTeam.go = 1;
        ob.myTeam.roundPlayed = 0;
        ob.myTeam.$updateTeam(function(myTeam) {
        
        ob.fetchAllTeams();
        });*/

    };

}]);