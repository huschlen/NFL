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

	<!--Divisional Round-->
	<div class="container col-sm-12">
		<form name="divisionalRoundForm" method="POST">
			<!--<div class="table-bordered divisional-round" ng-repeat="team in nflCtrl.teams"  ng-if="$index % 2 == 0" class="row">-->
			<div ng-repeat="team in nflCtrl.teams" class="row" ng-if="$even">
				<div ng-if="team.division=='AFC'"><strong>AFC</strong></div>
				<div ng-if="team.division=='NFC'"><strong>NFC</strong></div>

					<!--<div ng-repeat="product in products" ng-if="$index % 3 == 0" class="row">
					    <div class="col-xs-4">{{products[$index]}}</div>
					    <div class="col-xs-4" ng-if="products.length > ($index + 1)">{{products[$index + 1]}}</div>
					    <div class="col-xs-4" ng-if="products.length > ($index + 2)">{{products[$index + 2]}}</div>
					</div>-->

					<!--<div  ng-repeat="dummy in options">
				    	<div class="row" ng-if="$even"
				           <div class="col-xs-5">
				                <input type="checkbox"  
				               ng-model="options[$index   ].v">&nbsp;<span>{{options[$index  ].d}}</span>
				            </div>
				            <div class="col-xs-5">
				                <input type="checkbox" 
				                ng-model="options[$index +1].v">&nbsp;<span>{{options[$index+1].d}}</span>                   
				            </div>
				    	</div>
				    </div>-->


					<div class="col-sm-5">
						<img src={{nflCtrl.teams[$index].logo}}>
						<strong>{{nflCtrl.teams[$index].location}}</strong>
						<strong>{{nflCtrl.teams[$index].name}}</strong>
					</div>
					<div class="col-sm-5" ng-if="teams.length > ($index + 1)">
						<img src={{nflCtrl.teams[$index+1].logo}}>
						<strong>{{nflCtrl.teams[$index+1].location}}</strong>
						<strong>{{nflCtrl.teams[$index+1].name}}</strong>
					</div>


				<input type="button" class="btn btn-xs btn-primary" ng-click="nflCtrl.play(team.tid)" value="Play"/>
			</div>
		</form>
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