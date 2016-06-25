'use strict';

Array.prototype.flatMap = function(lambda) {
	return Array.prototype.concat.apply([], this.map(lambda));
};

var API_URL = 'http://192.168.0.113:8080/';

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
				templateUrl: 'views/transactions.tpl.html',
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

		$mdThemingProvider.definePalette('amazingPaletteName', {
			'50': 'ffebee',
			'100': 'ffcdd2',
			'200': 'ef9a9a',
			'300': '2480c4', //LIGHTBLUE
			'400': 'ef5350',
			'500': '1f4293', //darkblue
			'600': 'e53935',
			'700': 'd32f2f',
			'800': 'c62828',
			'900': 'b71c1c',
			'A100': 'ff8a80',
			'A200': 'ff5252',
			'A400': 'ff1744',
			'A700': 'd50000',
			'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
												// on this palette should be dark or light
			'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
				'200', '300', '400', 'A100'],
			'contrastLightColors': undefined    // could also specify this if default was 'dark'
		});

		$mdThemingProvider.theme('default')
				.primaryPalette('amazingPaletteName')


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

	.run(function(editableOptions, editableThemes) {
	})

	.controller('MainController',
		function MainController($scope, $location) {
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

			$scope.activePath = null;
			$scope.$on('$routeChangeSuccess', function(){
				$scope.activePath = $location.path().substring(1);
				console.log( $scope.activePath );
			});


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