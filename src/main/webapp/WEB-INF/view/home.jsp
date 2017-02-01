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
			<div class="game-time-form" ng-show="play && !gameOver">
				<h3>Game Time!</h3>
				<div class="row update-form-row">
					<div class="col-sm-5">
						<div class="input-group">
							<img src={{nflCtrl.team1.logo}}>&nbsp;
							<strong>{{nflCtrl.team1.location}}</strong>&nbsp;
							<strong>{{nflCtrl.team1.name}}</strong>&nbsp;
							<span><strong>{{nflCtrl.team1.round1Score}}</strong></span>
							<span ng-show=""><strong>{{nflCtrl.team1.round2Score}}</strong></span>
							<span ng-show=""><strong>{{nflCtrl.team1.round3Score}}</strong></span>
						</div>
					</div>
					<div class="col-sm-2">
						<span><strong>VS</strong></span>
					</div>
					<div class="col-sm-5">
						<div class="input-group">
							<img src={{nflCtrl.team2.logo}}>&nbsp;
							<strong>{{nflCtrl.team2.location}}</strong>&nbsp;
							<strong>{{nflCtrl.team2.name}}</strong>&nbsp;
							<span><strong>{{nflCtrl.team2.round1Score}}</strong></span>
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
					ng-show="play">{{gameTimeButton}}
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
				<div class="table-bordered" ng-repeat="team in nflCtrl.teams">
					<div class="row" class="col-sm-12" ng-if="$even">
						<div class="col-sm-5">
							<img src={{nflCtrl.teams[$index].logo}}>&nbsp;
							<strong>{{nflCtrl.teams[$index].location}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index].name}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index].round1Score}}</strong>
						</div>
						<div class="col-sm-2">
							<strong>VS</strong>
						</div>
						<div class="col-sm-5" ng-if="nflCtrl.teams.length > ($index + 1)">
							<img src={{nflCtrl.teams[$index+1].logo}}>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].location}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].name}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].round1Score}}</strong>
						</div>
						<div class="col-sm-2" id="divPlayButton">
							<input type="button" class="btn btn-xs btn-primary" id="playButton" ng-click="nflCtrl.gameTime(nflCtrl.teams[$index].tid, nflCtrl.teams[$index+1].tid)" value="Play"/>
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
			<form name="divisionalRoundForm" method="POST">
				<div class="table-bordered" ng-repeat="team in nflCtrl.teams">
					<div class="row" class="col-sm-12" ng-if="$even">
						<div class="col-sm-5">
							<img src={{nflCtrl.teams[$index].logo}}>&nbsp;
							<strong>{{nflCtrl.teams[$index].location}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index].name}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index].round2Score}}</strong>
						</div>
						<div class="col-sm-2">
							<strong>VS</strong>
						</div>
						<div class="col-sm-5" ng-if="nflCtrl.teams.length > ($index + 1)">
							<img src={{nflCtrl.teams[$index+1].logo}}>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].location}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].name}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].round2Score}}</strong>
						</div>
						<div class="col-sm-2" id="divPlayButton">
							<input type="button" class="btn btn-xs btn-primary" id="playButton" ng-click="nflCtrl.gameTime(nflCtrl.teams[$index].tid, nflCtrl.teams[$index+1].tid)" value="Play"/>
						</div>
					</div>
				</div><!--end of <div class="table-bordered", ng-repeat="team in nflCtrl.teams">-->
			</form>
		</div><!--end of <div class="col-sm-12">-->
	</div>

	<!--Super Bowl-->
	<div class="container">
		<div class="col-sm-12">
			<h3>Super Bowl</h3>
			<form name="divisionalRoundForm" method="POST">
				<div class="table-bordered" ng-repeat="team in nflCtrl.teams">
					<div class="row" class="col-sm-12" ng-if="$even">
						<div class="col-sm-5">
							<img src={{nflCtrl.teams[$index].logo}}>&nbsp;
							<strong>{{nflCtrl.teams[$index].location}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index].name}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index].round2Score}}</strong>
						</div>
						<div class="col-sm-2" class="vs">
							<strong>VS</strong>
						</div>
						<div class="col-sm-5" ng-if="nflCtrl.teams.length > ($index + 1)">
							<img src={{nflCtrl.teams[$index+1].logo}}>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].location}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].name}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].round2Score}}</strong>
						</div>
						<div class="col-sm-2" id="divPlayButton">
							<input type="button" class="btn btn-xs btn-primary" id="playButton" ng-click="nflCtrl.gameTime(nflCtrl.teams[$index].tid, nflCtrl.teams[$index+1].tid)" value="Play"/>
						</div>
					</div>
				</div><!--end of <div class="table-bordered", ng-repeat="team in nflCtrl.teams">-->
			</form>
		</div><!--end of <div class="col-sm-12">-->
	</div>
	
</body>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.3.0/ui-bootstrap.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-resource.js"></script>
<script src="${pageContext.request.contextPath}/app-resources/js/nflApp.js"></script>
</html>