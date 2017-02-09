<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>NFL</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/app-resources/css/nflStyle.css">
</head>
<body id="pageBody" ng-app="nfl" ng-controller="NflController as nflCtrl">
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
							<span ng-show="divisionalRound"><strong>{{nflCtrl.team1.round1Score}}</strong></span>
							<span ng-show="conferenceChampionship"><strong>{{nflCtrl.team1.round2Score}}</strong>
							<span ng-show="superBowl"><strong>{{nflCtrl.team1.round3Score}}</strong>
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
							<strong ng-show="divisionalRound">{{nflCtrl.team2.round1Score}}</strong>
							<span ng-show="conferenceChampionship"><strong>{{nflCtrl.team2.round2Score}}</strong></span>
							<span ng-show="superBowl"><strong>{{nflCtrl.team2.round3Score}}</strong></span>
						</div>
					</div>		
				</div>

				<button
					type="button"
					id="gameTimeButton"
					class="btn btn-primary"
					ng-click="nflCtrl.saveResult()"
					ng-show="play && !gameOver">{{gameTimeButton}}
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
						<div class="col-sm-1 vs">
							<strong>VS</strong>
						</div>
						<div class="col-sm-5" ng-if="nflCtrl.teams.length > ($index + 1)">
							<img src={{nflCtrl.teams[$index+1].logo}}>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].location}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].name}}</strong>&nbsp;
							<strong>{{nflCtrl.teams[$index+1].round1Score}}</strong>
						</div>
						<div class="col-sm-1 divPlayButton">
							<input type="button" class="btn btn-xs btn-primary playButton" id="{{'round1'+$index}}" ng-click="nflCtrl.play(nflCtrl.teams[$index].tid, nflCtrl.teams[$index+1].tid, 1, 'round1'+$index)" value="Play"/>
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
			<!--<div ng-show="!conferenceChampionshipGame1Done">-->
				<div class="table-bordered">
					<div class="table team-list" ng-repeat="game1Team1 in nflCtrl.teams | conferenceChampionshipFilter:game1Team1 | limitTo:1:0">
						<div class="row" class="col-sm-12">
							<div class="col-sm-10">
								<img src={{game1Team1.logo}}>&nbsp;
								<strong>{{game1Team1.division}}</strong>&nbsp;
								<strong>{{game1Team1.location}}</strong>&nbsp;
								<strong>{{game1Team1.name}}</strong>&nbsp;
								<strong>{{game1Team1.round2Score}}</strong>
								<input
									type="text"
									ng-init="conferenceChampionshipGame1Team1.tid=game1Team1.tid"
									ng-model="conferenceChampionshipGame1Team1.tid"
									value="{{game1Team1.tid}}"
									ng-show="showField">
							</div>
						</div>
					</div>
					<div class="table team-list" ng-repeat="game1Team2 in nflCtrl.teams | conferenceChampionshipFilter:game1Team2 | limitTo:1:1">
						<div class="row" class="col-sm-12">
							<div class="col-sm-10">
								<img src={{game1Team2.logo}}>&nbsp;
								<strong>{{game1Team2.division}}</strong>&nbsp;
								<strong>{{game1Team2.location}}</strong>&nbsp;
								<strong>{{game1Team2.name}}</strong>&nbsp;
								<strong>{{game1Team2.round2Score}}</strong>
							</div>					
							<div class="col-sm-2 divPlayButton">
								<input type="button" class="btn btn-xs btn-primary playButton" id="round2Game1" ng-click="nflCtrl.round2AndRound3(game1Team2.tid, 2, 'round2Game1')" value="Play"/>
							</div>
						</div>
					</div>
				</div>

				<!--<div ng-show="!conferenceChampionshipGame2Done">-->
				<div class="table-bordered">
					<div class="table team-list" ng-repeat="game2Team1 in nflCtrl.teams | conferenceChampionshipFilter:game2Team1 | limitTo:1:2">
						<div class="row" class="col-sm-12" ng-model="game2Team1.tid">
							<div class="col-sm-10">
								<img src={{game2Team1.logo}}>&nbsp;
								<strong>{{game2Team1.division}}</strong>&nbsp;
								<strong>{{game2Team1.location}}</strong>&nbsp;
								<strong>{{game2Team1.name}}</strong>&nbsp;
								<strong>{{game2Team1.round2Score}}</strong>
								<input
									type="text"
									ng-init="conferenceChampionshipGame2Team1.tid=game2Team1.tid"
									ng-model="conferenceChampionshipGame2Team1.tid"
									value="{{game2Team1.tid}}"
									ng-show="showField">
							</div>
						</div>
					</div>
					<div class="table team-list" ng-repeat="game2Team2 in nflCtrl.teams | conferenceChampionshipFilter:game2Team2 | limitTo:1:3">
						<div class="row" class="col-sm-12">
							<div class="col-sm-10">
								<img src={{game2Team2.logo}}>&nbsp;
								<strong>{{game2Team2.division}}</strong>&nbsp;
								<strong>{{game2Team2.location}}</strong>&nbsp;
								<strong>{{game2Team2.name}}</strong>&nbsp;
								<strong>{{game2Team2.round2Score}}</strong>
							</div>
							<div class="col-sm-2 divPlayButton">
								<input type="button" class="btn btn-xs btn-primary playButton" id="round2Game2" ng-click="nflCtrl.round2AndRound3(game2Team2.tid, 2, 'round2Game2')" value="Play"/>
							</div>
						</div>
					</div>
				</div>

			</form>
		</div><!--end of <div class="col-sm-12">-->
	</div>

	<!--Super Bowl-->
	<div class="container">
		<div class="col-sm-12">
			<h3>Super Bowl</h3>
			<form name="superBowlForm" method="POST">
				<div>
				<div class="table team-list" ng-repeat="superBowlTeam1 in nflCtrl.teams | superBowlFilter:superBowlTeam1 | limitTo:1:0">
					<div class="row" class="col-sm-12">
						<div class="col-sm-10">
							<img src={{superBowlTeam1.logo}}>&nbsp;
							<strong>{{superBowlTeam1.division}}</strong>&nbsp;
							<strong>{{superBowlTeam1.location}}</strong>&nbsp;
							<strong>{{superBowlTeam1.name}}</strong>&nbsp;
							<strong>{{superBowlTeam1.round2Score}}</strong>
							<input
								type="text"
								ng-init="gagaTeam1.tid=superBowlTeam1.tid"
								ng-model="gagaTeam1.tid"
								value="{{superBowlTeam1.tid}}"
								ng-show="showField">
						</div>
					</div>
				</div>
				<div class="table team-list" ng-repeat="superBowlTeam2 in nflCtrl.teams | superBowlFilter:superBowlTeam2 | limitTo:1:1">
					<div class="row" class="col-sm-12">
						<div class="col-sm-10">
							<img src={{superBowlTeam2.logo}}>&nbsp;
							<strong>{{superBowlTeam2.division}}</strong>&nbsp;
							<strong>{{superBowlTeam2.location}}</strong>&nbsp;
							<strong>{{superBowlTeam2.name}}</strong>&nbsp;
							<strong>{{superBowlTeam2.round2Score}}</strong>
						</div>					
						<div class="col-sm-2 divPlayButton">
							<input type="button" class="btn btn-xs btn-primary playButton" id="superBowlGame" ng-click="nflCtrl.round2AndRound3(superBowlTeam2.tid, 3, 'superBowlGame')" value="Play"/>
						</div>
					</div>
				</div>
				</div>
			</form>
		</div><!--end of <div class="col-sm-12">-->
	</div>
	
	<div class="container">
		<form name="startOver" method="POST">
		<button type="button"
				class="btn btn-md btn-primary btn-start-over"
				id="startOver"
				ng-click="nflCtrl.startOver()">Start Over
		</button>
		</form>
	</div>
	<div class="footer"></div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.3.0/ui-bootstrap.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-resource.js"></script>
<!--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-route.js"></script>-->
<script src="${pageContext.request.contextPath}/app-resources/js/nflApp.js"></script>
<script src="${pageContext.request.contextPath}/app-resources/js/filters/conferenceChampionshipFilter.js"></script>
<script src="${pageContext.request.contextPath}/app-resources/js/filters/superBowlFilter.js"></script>
<!--<script src="${pageContext.request.contextPath}/app-resources/js/filters/indexFilter.js"></script>-->
</html>