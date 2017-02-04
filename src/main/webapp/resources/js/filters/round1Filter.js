angular
	.module('nfl')
	.filter('round1Filter', function() {
		return function(teams, team) {
			var filtered = [];
			angular.forEach(teams, function(team) {
				console.log("team.roundPlayed: "+team.roundPlayed);
				if(team.roundPlayed == 0) {		
					filtered.push(team);
				}
			});
			console.log(filtered);
			return filtered;
		}
	});