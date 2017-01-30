var app = angular.module('nfl',['ui.bootstrap','ngResource']);

app.factory('Team', ['$resource', function ($resource) {
	return $resource('http://localhost:8080/nfl-1/teams/:teamId', {teamId: '@tid'},
		{
			updateTeam: {method: 'PUT'}
		}
    );
}]);

app.controller('NflController', ['$scope', 'Team', function($scope, Team) {
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
    ob.team = new Team();
    ob.fetchAllTeams = function(){       
        ob.teams = Team.query();   
    };
    ob.fetchAllTeams();
    ob.addTeam = function(){
        console.log('Inside save');
        ob.team.$save(function(team) {
        console.log(team);
        ob.reset(); 
        ob.fetchAllTeams();
        },
        function(err) {
            console.log(err.status);
            ob.flag='failed';
        });
    }; 
    ob.updateGo = function(id) {
        console.log('Inside updateGo');
        ob.team = Team.get({ teamId:id }, function() {
            ob.flag = 'edit';
        });
        ob.team.$updateTeam(function(team) {
        console.log(team); 
        ob.updatedId = team.tid;
        ob.reset();
        ob.flag = 'updated';
        ob.fetchAllTeams();
       });
    };     
    ob.deleteTeam = function(id){
        console.log('Inside delete');
        ob.team = Team.delete({ teamId:id }, function() {
            ob.reset();  
            ob.flag = 'deleted';
            ob.fetchAllTeams(); 
        });
    };
    ob.play = function(average1, average2) {
        console.log('Inside play');
        $scope.scoreHome = Math.floor(Math.random() * ((average1-0)+1) + 0);
        $scope.scoreAway = Math.floor(Math.random() * ((average2-0)+1) + 0);
        console.log($scope.scoreHome);
        console.log($scope.scoreAway);
    };

}]);