var app = angular.module('nfl', ['ui.bootstrap', 'ngResource']);

app.factory('Team', ['$resource', function ($resource) {
	return $resource('http://localhost:8080/nfl-1/teams/:teamId', {teamId: '@tid'},
		{
			updateTeam: {method: 'PUT'}
		}
    );
}]);

app.factory('ResetTeams', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/nfl-1/teams', {},
        {
            startOver: {method: 'PUT'}
        }
    );
}]);

app.controller('NflController', ['$scope', '$window', '$resource', 'Team', 'ResetTeams', function($scope, $window, $resource, Team, ResetTeams) {

    var ob = this;
    var round1Counter = 0;
    var round2Counter = 0;
    ob.teams = [];
    ob.myTeam = new Team();
    ob.team1 = new Team();
    ob.team2 = new Team();
    ob.resetTeams = new ResetTeams();
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
    $scope.showField = false;
    $scope.conferenceChampionshipGame1Team1 = {
        tid: ""
    };
    $scope.conferenceChampionshipGame2Team1 = {
        tid: ""
    };
    $scope.conferenceChampionshipGame1Done = false;
    $scope.conferenceChampionshipGame2Done = false;
    $scope.gagaTeam1 = {
        tid: ""
    };

    ob.fetchAllTeams = function() {       
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

    ob.round2AndRound3 = function(tid2, round, buttonId) {
        console.log("$scope.conferenceChampionshipGame1Team1.tid: "+$scope.conferenceChampionshipGame1Team1.tid);
        if(round == 2) {
            if(buttonId == "round2Game1") {
                $scope.conferenceChampionshipGame1Done = true;
                ob.play($scope.conferenceChampionshipGame1Team1.tid, tid2, round, buttonId);
            }
            else {
                $scope.conferenceChampionshipGame2Done = true;
                ob.play($scope.conferenceChampionshipGame2Team1.tid, tid2, round, buttonId);
            }
        }
        if(round == 3) {
            ob.play(gagaTeam1.tid, tid2, round, buttonId);
        }
    }

    ob.play = function(id1, id2, round, buttonId) {
        console.log("id1" + id1);
        console.log("id2" + id2);
        $scope.team1Won = false;
        $scope.team2Won = false;
        $scope.play = true;
        $scope.gameOver = false;
        $window.scrollTo(0, 0);
        $window.document.getElementById(buttonId).disabled = true;
        ob.team1 = Team.get({ teamId:id1 }, function() {
        });
        ob.team2 = Team.get({ teamId:id2 }, function() {
        });
        if(round == 1) {
            divisionalRound = true;
            indexRound1 = arrayDivisionalRoundGames.indexOf(buttonId);
            if(indexRound1 < 0) {
                arrayDivisionalRoundGames.push(buttonId);
            }
        }
        if(round == 2) {
            conferenceChampionship = true;
            divisionalRound = false;
            indexRound2 = arrayConferenceChampionshipGames.indexOf(buttonId);
            if(indexRound2 < 0) {
                arrayConferenceChampionshipGames.push(buttonId);
            }
        }
        if(round == 3) {
            superBowl = true;
            divisionalRound = false;
            conferenceChampionship = false;
        }  
        console.log("buttonId " + buttonId);

        $window.document.getElementById(buttonId).disabled = true;
        
    };

    ob.saveResult = function() {
        if(arrayDivisionalRoundGames.length == 4) {
            $scope.round1Done = true;
        }
        if(arrayConferenceChampionshipGames.length == 2) {
            $scope.round2Done = true;
        }
        if (divisionalRound == true) {
            console.log("inside if divisionRound==true");
            ob.team1.roundPlayed = 1;
            ob.team2.roundPlayed = 1;
            ob.team1.round1Score = Math.floor(Math.random() * ((ob.team1.average-0)+1) + 0);
            ob.team2.round1Score = Math.floor(Math.random() * ((ob.team2.average-0)+1) + 0);
            if(ob.team1.round1Score < ob.team2.round1Score) {
                ob.team1.go = 0;
                $scope.team1Won = false;
                $scope.team2Won = true;          
                $scope.play = false;
                //$scope.gameOver = true;
                $scope.tieBreakerGame = false;
                $scope.gameTimeButton = "Game Time";
                //ob.fetchAllTeams();
            }
            else if(ob.team1.round1Score > ob.team2.round1Score) {
                ob.team2.go = 0;
                $scope.team1Won = true;
                $scope.team2Won = false;
            }
            else {
                $scope.gameTimeButton = "Tie Breaker";
                $scope.tieBreakerGame = true;
            }
            ob.team1.$updateTeam(function(team1) {
                console.log(team1);
                ob.fetchAllTeams();
            });
            ob.team2.$updateTeam(function(team2) {
                console.log(team2);
                ob.fetchAllTeams();
            });
            ob.fetchAllTeams();
        }
        if (conferenceChampionship == true) {
            ob.team1.round2Score = Math.floor(Math.random() * ((ob.team1.average-0)+1) + 0);
            ob.team2.round2Score = Math.floor(Math.random() * ((ob.team2.average-0)+1) + 0);
            ob.team1.roundPlayed = 2;
            ob.team2.roundPlayed = 2;
            if(ob.team1.round2Score < ob.team2.round2Score) {
                ob.team1.go = 0;
                $scope.team1Won = false;
                $scope.team2Won = true;
                $scope.play = false;
                //$scope.gameOver = true;
                $scope.tieBreakerGame = false;
                $scope.gameTimeButton = "Game Time";
                //ob.fetchAllTeams();
            }
            else if(ob.team1.round2Score > ob.team2.round2Score) {
                $scope.team1Won = true;
                $scope.team2Won = false;
            }
            else {
                $scope.gameTimeButton = "Tie Breaker";
                $scope.tieBreakerGame = true;
                //ob.fetchAllTeams();
            }
            ob.team1.$updateTeam(function(team1) {
                console.log(team1);
                ob.fetchAllTeams();
            });
            ob.team2.$updateTeam(function(team2) {
                console.log(team2);
                ob.fetchAllTeams();
            });
            ob.fetchAllTeams();
        }
        if (superBowl == true) {
            ob.team1.round3Score = Math.floor(Math.random() * ((ob.team1.average-0)+1) + 0);
            ob.team2.round3Score = Math.floor(Math.random() * ((ob.team2.average-0)+1) + 0);
            ob.team1.roundPlayed = 3;
            ob.team2.roundPlayed = 3;
            if(ob.team1.round3Score < ob.team2.round3Score) {
                ob.team1.go = 0;
                $scope.team1Won = false;
                $scope.team2Won = true;
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
                //ob.fetchAllTeams();
            }
            ob.team1.$updateTeam(function(team1) {
                console.log(team1);
                ob.fetchAllTeams();
            });
            ob.team2.$updateTeam(function(team2) {
                console.log(team2);
                ob.fetchAllTeams();
            });
            ob.fetchAllTeams();
        }
    };

    ob.startOver = function() {
    	round1Counter = 0;
        round2Counter = 0;
        ob.teams = [];
        ob.myTeam = new Team();
        ob.team1 = new Team();
        ob.team2 = new Team();
        divisionalRound = false;
        conferenceChampionship = false;
        superBowl = false;
        numOfDivisionalRoundGames = 0;
        numOfConferenceChampionshipGames = 0;
        arrayDivisionalRoundGames = [];
        arrayConferenceChampionshipGames = [];
        indexRound1 = -1;
        indexRound2 = -1;
        $scope.round1Done = false;
        $scope.round2Done = false;
        $scope.gameOver = false;
        $scope.gameTimeButton = "Game Time";
        $scope.team1Won = false;
        $scope.team2Won = false;
        $scope.showField = false;
        $scope.conferenceChampionshipGame1Team1 = {
            tid: ""
        };
        $scope.conferenceChampionshipGame2Team1 = {
            tid: ""
        };
        $scope.conferenceChampionshipGame1Done = false;
        $scope.conferenceChampionshipGame2Done = false;
        $scope.gagaTeam1 = {
            tid: ""
        };
        console.log("startOver");
        ob.resetTeams.$startOver(function() {
                ob.fetchAllTeams();
        });
    };

}]);