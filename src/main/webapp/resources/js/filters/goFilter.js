angular
	.module('nfl')
	.filter('goFilter', function() {
		return function(teams, go) {
			var filtered = [];
			angular.forEach(teams, function(team) {
				if((team.go == 1 && team.roundPlayed == 1) || (team.roundPlayed == 2)) {
					filtered.push(team);
				}
			});
			console.log(filtered);
			return filtered;
		}
	});