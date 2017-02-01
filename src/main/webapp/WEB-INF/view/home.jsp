<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>NFL</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/app-resources/css/style.css">
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
		<a href="/angular-spring-1/logout">Logout</a>
	</div>
	-->
	<div class="container">

		<form name="gameTimeForm" method="POST">	
		<!--Begin div class="update-form"-->
		<div class="col-sm-12">
		<div class="update-form" ng-show="play">		
			<h3>Game Time!</h3>
			<div class="row update-form-row">
				<div class="col-sm-5">
					<div class="input-group">
						<img src={{nflCtrl.team1.logo}}>
						<strong>{{nflCtrl.team1.location}}</strong>
						<strong>{{nflCtrl.team1.name}}</strong>&nbsp;
						<span><strong>{{nflCtrl.team1.score}}</strong></span>
					</div>
				</div>
				<div class="col-sm-2">
					<span><strong>VS</strong></span>
				</div>
				<div class="col-sm-5">
					<div class="input-group">
						<img src={{nflCtrl.team2.logo}}>
						<strong>{{nflCtrl.team2.location}}</strong>
						<strong>{{nflCtrl.team2.name}}</strong>&nbsp;
						<span><strong>{{nflCtrl.team2.score}}</strong></span>
					</div>
				</div>		
			</div> <!--End of div class="update-form-row"-->

			<button
				type="button"
				id="gameTimeButton"
				align="right"	
				class="btn btn-primary update-button"
				ng-click="nflCtrl.saveResult()"
				ng-show="play">Game Time!
			</button>
		</div> <!--End of div class="update-form"-->
		</div>
		<!--<span ng-if="toyCtrl.flag=='created'" class="msg-success">Toy successfully added.</span>
		<span ng-if="toyCtrl.flag=='updated'" class="msg-success">Toy successfully updated.</span>
		<span ng-if="toyCtrl.flag=='deleted'" class="msg-success">Toy successfully deleted.</span>-->
		</form>
</div> <!--End of dev class="container"-->

	<!--Divisional Round-->
	<div class="container">
	<div class="col-sm-12">
		<h3>Divisional Round</h3>
		<form name="divisionalRoundForm" method="POST">
			<!--<div class="table-bordered divisional-round" ng-repeat="team in nflCtrl.teams"  ng-if="$index % 2 == 0" class="row">-->
			<div ng-repeat="team in nflCtrl.teams">
				<div class="row" class="col-sm-12" ng-if="$even">
					<div class="col-sm-5">
						<img src={{nflCtrl.teams[$index].logo}}>
						<strong>{{nflCtrl.teams[$index].location}}</strong>
						<strong>{{nflCtrl.teams[$index].name}}</strong>&nbsp;
						<strong>{{nflCtrl.teams[$index].score}}</strong>
					</div>
					<div class="col-sm-2">
						<strong>VS</strong>
					</div>
					<div class="col-sm-5" ng-if="nflCtrl.teams.length > ($index + 1)">
						<img src={{nflCtrl.teams[$index+1].logo}}>
						<strong>{{nflCtrl.teams[$index+1].location}}</strong>
						<strong>{{nflCtrl.teams[$index+1].name}}</strong>&nbsp;
						<strong>{{nflCtrl.teams[$index+1].score}}</strong>
					</div>
					<div class="col-sm-2">
						<input type="button" class="btn btn-xs btn-primary" align="right" ng-click="nflCtrl.gameTime(nflCtrl.teams[$index].tid, nflCtrl.teams[$index+1].tid)" value="Play"/>
					</div>
				</div>
			</div>
		</form>
	</div>
	</div>

<!--Conference Championship-->
<!--
<div class="container col-sm-12">
	<form name="conferenceChampionshipForm" method="POST">
		<div class="table-bordered conference-championship" ng-repeat="team in teamCtrl.teams">
			<div ng-if="team.division=='AFC'"><strong>AFC</strong></div>
			<div ng-if="team.division=='NFC'"><strong>NFC</strong></div>
			<div class="col-sm-5">
				<span>{{team.logo}}</span>
				<span><strong>{{team.location}}</strong></span>
				<span><strong>{{team.name}}</strong></span>
			</div>
			<div class="col-sm-2"><strong>VS</strong></div>
			<div class="col-sm-5">
				<span>{{team.logo}}</span>
				<span><strong>{{team.location}}</strong></span>
				<span><strong>{{team.name}}</strong></span>
			</div>
			<input type="button" class="btn btn-xs btn-primary" ng-click="nflCtrl.updateGo(team.tid)" value="Play"/>
		</div>
	</form>
</div>
-->

<!--Super Bowl-->
<!--
<div class="container col-sm-12">
	<form name="superBowlForm" method="POST">
		<div class="table-bordered super-bowl" ng-repeat="team in teamCtrl.teams">
			<div class="col-sm-5">
				<span>{{team.logo}}</span>
				<span><strong>{{team.location}}</strong></span>
				<span><strong>{{team.name}}</strong></span>
			</div>
			<div class="col-sm-2"><strong>VS</strong></div>
			<div class="col-sm-5">
				<span>{{team.logo}}</span>
				<span><strong>{{team.location}}</strong></span>
				<span><strong>{{team.name}}</strong></span>
			</div>
			<input type="button" class="btn btn-xs btn-primary" ng-click="nflCtrl.updateGo(team.tid)" value="Play"/>
		</div>
	</form>
</div>
<div>
	<input type="button" class="btn btn-xs btn-primary" ng-click="nflCtrl.startOver()" value="Start Over"/>
</div>
-->
	
</body>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.3.0/ui-bootstrap.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-resource.js"></script>
<script src="${pageContext.request.contextPath}/app-resources/js/app.js"></script>
</html>