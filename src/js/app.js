'use strict';

Array.prototype.flatMap = function(lambda) {
	return Array.prototype.concat.apply([], this.map(lambda));
};

angular
	.module('mani', [
		'templates',
		'ngRoute',
		'ui.bootstrap'
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
;