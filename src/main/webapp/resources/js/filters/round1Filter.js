angular
	.module('nfl')
	.filter('round1Filter', function() {
		return function(teams) {
			var filtered = [];
			angular.forEach(teams, function(myTeam) {
				if(myTeam.go == 1 && myTeam.roundPlayed == 0) {		
					filtered.push(myTeam);
				}
			});
			return filtered;
		}
	});