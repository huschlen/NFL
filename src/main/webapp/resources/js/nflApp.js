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
    var currentRound = 0;
    var numOfDivisionalRoundGames = 0;
    var numOfConferenceChampionshipGames = 0;
    var arrayDivisionalRoundGames = [];
    var arrayConferenceChampionshipGames = [];
    var indexRound1 = -1;
    var indexRound2 = -1;
    ob.teams = [];
    ob.myTeam = new Team();
    ob.team1 = new Team();
    ob.team2 = new Team();
    ob.resetTeams = new ResetTeams();
    $scope.round1 = false;
    $scope.round2 = false;
    $scope.round3 = false;
    $scope.round1Done = false;
    $scope.round2Done = false;
    $scope.round3Done = false;
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

    /*Manipulating HTML in a controller is not a good practice.*/
    /*angular.element(document).ready(function () {
        if($window.localStorage.getItem('round10') == 'disabled') {
            angular.element(document.getElementById('round10')).prop('disabled', true);
        }
    });*/

    ob.addTeam = function(){
        console.log('Inside addTeam');
        ob.myTeam.$save(function(myTeam) {
        console.log(myTeam);
        ob.fetchAllTeams();
        },
        function(err) {
            console.log(err.status);
        });
    }; 
   
    ob.deleteTeam = function(id){
        console.log('Inside delete');
        ob.myTeam = Team.delete({ teamId:id }, function() {
            ob.fetchAllTeams(); 
        });
    };

    ob.round2AndRound3 = function(tid2, round, buttonId) {
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
            ob.play($scope.gagaTeam1.tid, tid2, round, buttonId);
        }
    }

    ob.play = function(id1, id2, round, buttonId) {
        $scope.team1Won = false;
        $scope.team2Won = false;
        $scope.gameTime = true;
        $window.scrollTo(0, 0);
        //$window.document.getElementById(buttonId).disabled = true;
        $window.localStorage.setItem(buttonId, 'disabled');
        ob.team1 = Team.get({ teamId:id1 }, function() {
        });
        ob.team2 = Team.get({ teamId:id2 }, function() {
        });
        if(round == 1) {
            $scope.round1 = true;
            currentRound = 1;
            indexRound1 = arrayDivisionalRoundGames.indexOf(buttonId);
            if(indexRound1 < 0) {
                arrayDivisionalRoundGames.push(buttonId);
            }
        }
        if(round == 2) {
            $scope.round2 = true;
            $scope.round1 = false;
            currentRound = 2;
            indexRound2 = arrayConferenceChampionshipGames.indexOf(buttonId);
            if(indexRound2 < 0) {
                arrayConferenceChampionshipGames.push(buttonId);
            }
        }
        if(round == 3) {
            $scope.round3 = true;
            $scope.round1 = false;
            $scope.round2 = false;
            currentRound = 3;
            $scope.round3Done = true;
        }     
    };

    ob.saveResult = function() {
        if(arrayDivisionalRoundGames.length == 4) {
            $scope.round1Done = true;
        }
        if(arrayConferenceChampionshipGames.length == 2) {
            $scope.round2Done = true;
        }
        if (currentRound == 1) {
            ob.team1.roundPlayed = 1;
            ob.team2.roundPlayed = 1;
            ob.team1.round1Score = Math.floor(Math.random() * ((ob.team1.average-0)+1) + 0);
            ob.team2.round1Score = Math.floor(Math.random() * ((ob.team2.average-0)+1) + 0);
            if(ob.team1.round1Score < ob.team2.round1Score) {
                ob.team1.go = 0;
                ob.team2.go = 1;
                $scope.team1Won = false;
                $scope.team2Won = true;          
                $scope.gameTime = false;
                $scope.tieBreakerGame = false;
                $scope.gameTimeButton = "Game Time";
            }
            else if(ob.team1.round1Score > ob.team2.round1Score) {
                ob.team1.go = 1;
                ob.team2.go = 0;
                $scope.team1Won = true;
                $scope.team2Won = false;
                $scope.gameTime = false;
                $scope.tieBreakerGame = false;
                $scope.gameTimeButton = "Game Time";
            }
            else {
                $scope.tieBreakerGame = true;
                $scope.gameTimeButton = "Tie Breaker";
            }
            ob.team1.$updateTeam(function(team1) {
                ob.fetchAllTeams();
            });
            ob.team2.$updateTeam(function(team2) {
                ob.fetchAllTeams();
            });
            ob.fetchAllTeams();
        }
        if (currentRound == 2) {
            ob.team1.round2Score = Math.floor(Math.random() * ((ob.team1.average-0)+1) + 0);
            ob.team2.round2Score = Math.floor(Math.random() * ((ob.team2.average-0)+1) + 0);
            ob.team1.roundPlayed = 2;
            ob.team2.roundPlayed = 2;
            if(ob.team1.round2Score < ob.team2.round2Score) {
                ob.team1.go = 0;
                ob.team2.go = 1;
                $scope.team1Won = false;
                $scope.team2Won = true;
                $scope.gameTime = false;
                $scope.tieBreakerGame = false;
                $scope.gameTimeButton = "Game Time";
            }
            else if(ob.team1.round2Score > ob.team2.round2Score) {
                ob.team1.go = 1;
                ob.team2.go = 0;
                $scope.team1Won = true;
                $scope.team2Won = false;
                $scope.gameTime = false;
                $scope.tieBreakerGame = false;
                $scope.gameTimeButton = "Game Time";
            }
            else {
                $scope.tieBreakerGame = true;
                $scope.gameTimeButton = "Tie Breaker";
            }
            ob.team1.$updateTeam(function(team1) {
                ob.fetchAllTeams();
            });
            ob.team2.$updateTeam(function(team2) {
                ob.fetchAllTeams();
            });
            ob.fetchAllTeams();
        }
        if (currentRound == 3) {
            ob.team1.round3Score = Math.floor(Math.random() * ((ob.team1.average-0)+1) + 0);
            ob.team2.round3Score = Math.floor(Math.random() * ((ob.team2.average-0)+1) + 0);
            //ob.team1.roundPlayed = 3;
            //ob.team2.roundPlayed = 3;
            if(ob.team1.round3Score < ob.team2.round3Score) {
                //ob.team1.go = 0;
                $scope.team1Won = false;
                $scope.team2Won = true;
                $scope.gameTime = false;
                $scope.tieBreakerGame = false;
                $scope.gameTimeButton = "Game Time";
            }
            else if(ob.team1.round3Score > ob.team2.round3Score) {
                $scope.team1Won = true;
                $scope.team2Won = false;
                $scope.gameTime = false;
                $scope.tieBreakerGame = false;
                $scope.gameTimeButton = "Game Time";
            }
            else {
                $scope.tieBreakerGame = true;
                $scope.gameTimeButton = "Tie Breaker";
            }
            ob.team1.$updateTeam(function(team1) {
                ob.fetchAllTeams();
            });
            ob.team2.$updateTeam(function(team2) {
                ob.fetchAllTeams();
            });
            ob.fetchAllTeams();
        }
    };

    ob.startOver = function() {
        $window.localStorage.clear();
    	round1Counter = 0;
        round2Counter = 0;
        currentRound = 0;
        numOfDivisionalRoundGames = 0;
        numOfConferenceChampionshipGames = 0;
        arrayDivisionalRoundGames = [];
        arrayConferenceChampionshipGames = [];
        indexRound1 = -1;
        indexRound2 = -1;
        ob.teams = [];
        ob.myTeam = new Team();
        ob.team1 = new Team();
        ob.team2 = new Team();
        ob.resetTeams = new ResetTeams();
        $scope.round1 = false;
        $scope.round2 = false;
        $scope.round3 = false;
        $scope.round1Done = false;
        $scope.round2Done = false;
        $scope.round3Done = false;
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
        ob.resetTeams.$startOver(function() {
            ob.fetchAllTeams();
        });
    };

}]);