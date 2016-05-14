'use strict';

angular.module('mani').service('transactionsService', function TransactionsService($http){

	this.getTransactions = function(callback, errorFn) {

		$http({
			url: 'http://192.168.0.2:9002/transactions',
			method: "GET"
		}).then(function(res){

			var transactions = res.data.map(function(t) {
				t.date = new Date(t.date[0], t.date[1] - 1, t.date[2], 0, 0, 0, 0);
				if (t.category) {
					t.category = [t.category];
				}
				return t;
			});

			callback(transactions);
		});
	};

	this.setCategory = function(transaction, cat) {
		$http.put('http://192.168.0.2:9002/transactions/'+transaction.id+'/category',cat);
	}
});