'use strict';

Array.prototype.flatMap = function(lambda) {
	return Array.prototype.concat.apply([], this.map(lambda));
};

angular
	.module('mani', [
		'templates',
		'ngMaterial',
		'ngRoute',
		'angularUtils.directives.dirPagination',
		'rzModule'
	])
	.config(function ($routeProvider, $httpProvider, $mdThemingProvider) {
		$routeProvider
			.when('/transactions', {
				templateUrl: 'views/transactions.html',
				controller: 'TransactionsController'
			})
			.otherwise({
				redirectTo: '/transactions'
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
		$mdThemingProvider.theme('default');

		$mdThemingProvider
				.theme('default')
				.primaryPalette('red', {
					'default': '600'
				})
				.accentPalette('teal', {
					'default': '500'
				})
				.warnPalette('defaultPrimary');

		$mdThemingProvider.theme('dark', 'default')
				.primaryPalette('defaultPrimary')
				.dark();

		$mdThemingProvider.theme('grey', 'default')
				.primaryPalette('grey');

		$mdThemingProvider.theme('custom', 'default')
				.primaryPalette('defaultPrimary', {
					'hue-1': '50'
				});

		$mdThemingProvider.definePalette('defaultPrimary', {
			'50':  '#FFFFFF',
			'100': 'rgb(255, 198, 197)',
			'200': '#E75753',
			'300': '#E75753',
			'400': '#E75753',
			'500': '#E75753',
			'600': '#E75753',
			'700': '#E75753',
			'800': '#E75753',
			'900': '#E75753',
			'A100': '#E75753',
			'A200': '#E75753',
			'A400': '#E75753',
			'A700': '#E75753'
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