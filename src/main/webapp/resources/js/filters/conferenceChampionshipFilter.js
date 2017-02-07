angular
	.module('nfl')
	.filter('conferenceChampionshipFilter', function() {
		return function(teams, team) {
			var filtered = [];
			angular.forEach(teams, function(team) {
				console.log(team.name);
				if((team.go == 1 && team.roundPlayed == 1) || (team.roundPlayed == 2)) {
					filtered.push(team);
				}
			});
			console.log(filtered);
			return filtered;
		}
	});