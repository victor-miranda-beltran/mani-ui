'use strict';

angular.module('mani').service('transactionsService', function TransactionsService($http){

	this.getTransactions = function(callback, errorFn) {
		$http.get('http://localhost:8080/transactions')
				.then(function(res){

				var transactions = res.data.map(function(t) {
					t.date = new Date(t.dateAuthorization[0], t.dateAuthorization[1] - 1, t.dateAuthorization[2], 0, 0, 0, 0);
					if (t.category) {
						t.category = [t.category];
					}
					return t;
				});

				callback(transactions);
		});
	};

	this.setCategory = function(transaction, callback) {
		$http.put('http://localhost:8080/transactions/'+transaction.id+'/category',transaction.category[0])
				.success(function (res, status, headers, config) {
					callback(res);
				});
	};

	this.deleteCategory = function(transaction, callback) {
		$http.delete('http://localhost:8080/transactions/'+transaction.id+'/category');
	};

});