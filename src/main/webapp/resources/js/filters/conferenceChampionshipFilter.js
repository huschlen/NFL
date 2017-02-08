angular
	.module('nfl')
	.filter('conferenceChampionshipFilter', function() {
		return function(teams, team) {
			var filtered = [];
			angular.forEach(teams, function(team) {
				if((team.go == 1 && team.roundPlayed == 1) || (team.roundPlayed == 2)) {
					filtered.push(team);
				}
			});
			return filtered;
		}
	});