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
	.directive('limitTags', function() {
		return {
			require: 'ngModel',
			link: function(scope, elem, attrs, ngModel) {
				var maxTags = parseInt(attrs.maxTags, 10);
				ngModel.$parsers.unshift(function(value) {
					if (value && value.length > maxTags) {
						value.splice(value.length - 1, 1);
					}
					return value;
				});
			}
		};
	});
;