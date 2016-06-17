'use strict';

angular.module('mani').service('transactionsService', function TransactionsService($http){

	this.getTransactions = function(callback, errorFn) {
		$http.get('http://localhost:8080/transactions')
				.then(function(res){

					res.data.map(function(t) {
						if (t.category) {
							t.category = [t.category];
						}
						t.note = t.note || '';
						return t;
					});
				callback(res.data);
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

	this.updateNote = function(transaction, callback) {
		$http.put('http://localhost:8080/transactions/'+transaction.id+'/note',transaction.note);
	};

});