angular
	.module('nfl')
	.filter('goFilter', function() {
		return function(teams, go) {
			var filtered = [];
			angular.forEach(teams, function(team) {
				if(team.go == 1) {
					filtered.push(team);
				}
			});
			return filtered;
		}
	});