'use strict';

angular.module('mani').service('transactionsService', function TransactionsService($http){

	this.getTransactions = function() {

		return $http({
			url: 'http://mani:8080/transactions',
			method: "GET"
		});


	};
});