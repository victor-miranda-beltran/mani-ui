'use strict';

Array.prototype.flatMap = function(lambda) {
	return Array.prototype.concat.apply([], this.map(lambda));
};

angular
	.module('mani', [
		'templates',
		'ngRoute',
		'ui.bootstrap',
		'ngTagsInput'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/transactions.html',
				controller: 'TransactionsController'
			})
			.otherwise({
				redirectTo: '/'
			});
	})
	.filter('maney', function() {

		var defaultSettings = {
			decimals:2,
			currency: ' €'
		};

		return function(x, settings) {
			var config = angular.extend(defaultSettings, settings);

			if (x == undefined) {
				return '';
			}
			return x.toFixed(config.decimals) + config.currency;
		};
	})
	.factory('httpRequestInterceptor', function () {
		return {
			request: function (config) {

				config.headers['x-auth-token'] = 'victor:ead07c4d409eaecd4d2bdea6200a62e09397e119:d4fde4adf83304afd6da29264a863d36ae481e45';

				return config;
			}
		};
	})
	.config(function ($httpProvider) {
		$httpProvider.interceptors.push('httpRequestInterceptor');
	})
;