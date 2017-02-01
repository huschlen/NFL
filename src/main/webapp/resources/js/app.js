var app = angular.module('nfl', ['ui.bootstrap','ngResource']);

app.factory('Team', ['$resource', function ($resource) {
	return $resource('http://localhost:8080/nfl-1/teams/:teamId', {teamId: '@tid'},
		{
			updateTeam: {method: 'PUT'}
		}
    );
}]);

app.controller('NflController', ['$scope', '$window', 'Team', function($scope, $window, Team) {
    var newEnglandPatriotsAverage = 29;
    var kansasCityChiefsAverage = 25;
    var pittsburghSteelersAverage = 25;
    var denverBroncosAverage = 22;
    var arizonaCardinalsAverage = 30;
    var greenBayPackersAverage = 24;
    var carolinaPanthersAverage = 31;
    var seattleSeahawksAverage = 25;
    var ob = this;
    ob.teams=[];
    ob.team1 = new Team();
    ob.team2 = new Team();
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
            ob.reset();  
            ob.flag = 'deleted';
            ob.fetchAllTeams(); 
        });
    };

    ob.gameTime = function(id1, id2) {
        $scope.play = true;
        $window.scrollTo(0, 0);
        console.log('Inside play');
        ob.team1 = Team.get({ teamId:id1 }, function() {
        });
        ob.team2 = Team.get({ teamId:id2 }, function() {
        });
    };

    ob.saveResult = function() {
        console.log("inside saveResult")
        ob.team1.score = Math.floor(Math.random() * ((ob.team1.average-0)+1) + 0);
        ob.team2.score = Math.floor(Math.random() * ((ob.team2.average-0)+1) + 0);
        console.log(ob.team1);
        console.log(ob.team2);
        if(ob.team1.score != ob.team2.score) {
            ob.team1.$updateTeam(function(team1) {
            console.log(team1);
            ob.fetchAllTeams();
            });
            ob.team2.$updateTeam(function(team2) {
            console.log(team2);
            ob.fetchAllTeams();
            });
            if(ob.team1.score < ob.team2.score) {
                ob.team1.go = 0;
                ob.team1.$updateTeam(function(team1) {
                });
            }
            $scope.play = false;
            ob.fetchAllTeams();
        }
    };

}]);