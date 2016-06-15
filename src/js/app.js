'use strict';

Array.prototype.flatMap = function(lambda) {
	return Array.prototype.concat.apply([], this.map(lambda));
};

var API_URL = 'http://localhost:8080/';

angular
	.module('mani', [
		'templates',
		'ngMaterial',
		'ngRoute',
		'angularUtils.directives.dirPagination',
		'rzModule',
		'nvd3ChartDirectives',
		'xeditable'
	])
	.config(function ($routeProvider, $httpProvider, $mdThemingProvider) {
		$routeProvider
			.when('/transactions', {
				templateUrl: 'views/transactions.html',
				controller: 'TransactionsController'
			})
			.when('/dashboard', {
				templateUrl: 'views/dashboard.tpl.html',
				controller: 'DashboardController'
			})
			.when('/accounts', {
				templateUrl: 'views/accounts.tpl.html',
				controller: 'AccountsController'
			})
			.otherwise({
				redirectTo: '/dashboard'
			});


		$httpProvider.interceptors.push(function($q) {
			return {
				'request': function(config) {
					config.headers['x-auth-token'] = 'victor:ead07c4d409eaecd4d2bdea6200a62e09397e119:d4fde4adf83304afd6da29264a863d36ae481e45';
					return config;
				},

				'response': function(response) {
					return response;
				}
			};
		});

	})

	.controller('MainController',
		function MainController($scope) {
			$scope.menuItems = [
				{
					name: 'Dashboard',
					icon: 'dashboard',
					href: 'dashboard'
				},
				{
					name: 'Accounts',
					icon: 'account_box',
					href: 'accounts'
				},
				{
					name: 'Transactions',
					icon: 'find_in_page',
					href: 'transactions'
				},
				{
					name: 'Profile',
					icon: 'person',
					href: 'profile'
				},
				{
					name: 'Table',
					icon: 'assessment',
					href: '.table'
				}
			];


		})

		.filter('maney', function() {

			var defaultSettings = {
				decimals:2,
				currency: ' €'
			};

			return function(x, settings) {
				var config = angular.extend(defaultSettings, settings);
				
				return x;
			};
		})




;