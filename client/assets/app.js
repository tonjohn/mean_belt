var app = angular.module('myApp', ['ngRoute', 'ngCookies']);
app.config( function ( $routeProvider ) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.tpl.html',
			controller: 'loginController'
		})
		.when('/dashboard', {
			templateUrl: 'partials/dashboard.tpl.html',
			controller: 'loginController'
		})
		.when('/poll/:id', {
			templateUrl: 'partials/poll.tpl.html',
			controller: 'loginController'
		})
		.when('/create', {
			templateUrl: 'partials/create.tpl.html',
			controller: 'loginController'
		})
		.otherwise({
			redirectTo: '/'
		});
});
