<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>NFL</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/app-resources/css/nflStyle.css">
</head>
<body ng-app="nfl" ng-controller="NflController as nflCtrl">
	<!--Nav Bar-->
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand" href="#">NFL</a>
			</div>
		</div>
	</nav>
	<!--
	<div class="container col-sm-12 text-right">
		<a href="/nfl-1/logout">Logout</a>
	</div>
	-->
	<div class="container">
		<form name="gameTimeForm" method="POST">
		<div class="table-bordered">
		<div class="col-sm-12">
			<div class="game-time-form">
				<h3>Game Time!</h3>
				<div class="row">
					<div class="col-sm-5">
						<div class="input-group">
							<span><img src={{nflCtrl.team1.logo}}></span>&nbsp;
							<img src="${pageContext.request.contextPath}/app-resources/js/images/star.jpg" ng-show="team1Won">&nbsp;
							<strong>{{nflCtrl.team1.location}}</strong>&nbsp;
							<strong>{{nflCtrl.team1.name}}</strong>&nbsp;
							<span><strong>{{nflCtrl.team1.round1Score}}</strong></span>
							<span ng-show=""><strong>{{nflCtrl.team1.round2Score}}</strong>
							<span ng-show=""><strong>{{nflCtrl.team1.round3Score}}</strong>
						</div>
					</div>
					<div class="col-sm-2 vs">
						<span><strong>VS</strong></span>
					</div>
					<div class="col-sm-5">
						<div class="input-group">
							<span><img src={{nflCtrl.team2.logo}}></span>&nbsp;
							<img src="${pageContext.request.contextPath}/app-resources/js/images/star.jpg" ng-show="team2Won">&nbsp;
							<strong>{{nflCtrl.team2.location}}</strong>&nbsp;
							<strong>{{nflCtrl.team2.name}}</strong>&nbsp;
							<strong>{{nflCtrl.team2.round1Score}}</strong>
							<span ng-show=""><strong>{{nflCtrl.team2.round2Score}}</strong></span>
							<span ng-show=""><strong>{{nflCtrl.team2.round3Score}}</strong></span>
						</div>
					</div>		
				</div>

				<button
					type="button"
					id="gameTimeButton"
					class="btn btn-primary"
					ng-click="nflCtrl.saveResult()"
					ng-show="play && !gameOver && !round1Done">{{gameTimeButton}}
				</button>

				<button
					type="button"
					class="btn btn-primary"
					ng-show="round1Done && !round2Done">Go to Conference Championship!	
				</button>

				<button
					type="button"
					class="btn btn-primary"
					ng-show="round2Done">Go to Super Bowl!
				</button>
			</div><!--end of <div class="game-time-form" ng-show="play">-->
		</div>
		</div>
		</form>
	</div><!--End of dev class="container"-->

	<!--Divisional Round-->
	<div class="container">
		<div class="col-sm-12">
			<h3>Divisional Round</h3>
			<form name="divisionalRoundForm" method="POST">
				<div class="table-bordered team-list" ng-repeat="team in nflCtrl.teams">
					<span ng-if="team.division=='AFC'" ng-show="$even">AFC</span>
					<span ng-if="team.division=='NFC'" ng-show="$even">NFC</span>
					<div class="row" class="col-sm-12" ng-if="$even">
						<div class="col-sm-5">
							<img src={{nflCtrl.teams[$index].logo}}>&nbsp;
							<strong>{{nflCtrl.teams[$index].location}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index].name}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index].round1Score}}</strong>
						</div>
						<div class="col-sm-2 vs">
							<strong>VS</strong>
						</div>
						<div class="col-sm-5" ng-if="nflCtrl.teams.length > ($index + 1)">
							<img src={{nflCtrl.teams[$index+1].logo}}>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].location}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].name}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].round1Score}}</strong>
						</div>
						<div class="col-sm-2" id="divPlayButton">
							<input type="button" class="btn btn-xs btn-primary" id="{{'round1'+$index}}" ng-click="nflCtrl.play(nflCtrl.teams[$index].tid, nflCtrl.teams[$index+1].tid, 1, 'round1'+$index)" value="Play"/>
						</div>
					</div>
					
				</div><!--end of <div class="table-bordered", ng-repeat="team in nflCtrl.teams">-->
			</form>
		</div><!--end of <div class="col-sm-12">-->
	</div>

	<!--Conference Championship-->
	<div class="container">
		<div class="col-sm-12">
			<h3>Conference Championship</h3>
			<form name="conferenceChampionshipForm" method="POST">
				<div class="table-bordered team-list" ng-repeat="team in nflCtrl.teams | goFilter:team">
					<div class="row" class="col-sm-12">
						<div class="col-sm-4">
							<img src={{team.logo}}>&nbsp;
							<strong>{{team.division}}</strong>&nbsp;
							<strong>{{team.location}}</strong>&nbsp;
							<strong>{{team.name}}</strong>&nbsp;
							<strong>{{team.round2Score}}</strong>
						</div>
					</div>
					<div class="col-sm-2" id="divPlayButton" ng-if="$index==3">
						<input type="button" class="btn btn-xs btn-primary" id="playButton" ng-click="nflCtrl.play(team.tid, team.tid, 2)" value="Play"/>
					</div>

				</div><!--end of <div class="table-bordered", ng-repeat="team in nflCtrl.teams">-->
			</form>
		</div><!--end of <div class="col-sm-12">-->
	</div>

	<!--Super Bowl-->
	<div class="container">
		<div class="col-sm-12">
			<h3>Super Bowl</h3>
			<form name="superBowlForm" method="POST">
				<div class="table-bordered team-list" ng-repeat="team in nflCtrl.teams">
					<div class="row" class="col-sm-12" ng-if="$even">
						<div class="col-sm-5">
							<img src={{nflCtrl.teams[$index].logo}}>&nbsp;
							<strong>{{nflCtrl.teams[$index].location}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index].name}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index].round3Score}}</strong>
						</div>
						<div class="col-sm-2" class="vs">
							<strong>VS</strong>
						</div>
						<div class="col-sm-5" ng-if="nflCtrl.teams.length > ($index + 1)">
							<img src={{nflCtrl.teams[$index+1].logo}}>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].location}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].name}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].round3Score}}</strong>
						</div>
						<div class="col-sm-2" id="divPlayButton">
							<input type="button" class="btn btn-xs btn-primary" id="playButton" ng-click="nflCtrl.play(nflCtrl.teams[$index].tid, nflCtrl.teams[$index+1].tid, 3)" value="Play"/>
						</div>
					</div>
				</div><!--end of <div class="table-bordered", ng-repeat="team in nflCtrl.teams">-->
			</form>
		</div><!--end of <div class="col-sm-12">-->
	</div>
	
	<div class="container">
		<form name="startOver" method="POST">
		<button type="button"
				class="btn btn-md btn-primary"
				id="startOver"
				ng-click="nflCtrl.startOver()">Start Over
		</button>
		</form>
	</div>
	
</body>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.3.0/ui-bootstrap.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-resource.js"></script>
<script src="${pageContext.request.contextPath}/app-resources/js/nflApp.js"></script>
<script src="${pageContext.request.contextPath}/app-resources/js/filters/goFilter.js"></script>
<!--<script src="${pageContext.request.contextPath}/app-resources/js/filters/indexFilter.js"></script>-->
</html>