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
;