'use strict';

angular.module('mani').controller('TransactionsController', function TransactionsController($scope, transactionsService){

	$scope.pagination = {
		itemsPerPage: 15,
		currentPage: 0
	};

	$scope.pagedItems= [];


	$scope.$watch('transactionFilter', function() {

		if (!$scope.transactions) {
			return;
		}

		$scope.filteredItems = $scope.transactions.filter(function(t) {
			return t.description.toLowerCase().indexOf( $scope.transactionFilter.toLowerCase()) != -1;
		});
		$scope.pagination.currentPage = 0;

		$scope.groupToPages();
	});

	transactionsService.getTransactions().then(function(res){

		$scope.transactions = res.data.flatMap(function(account) {
			return account.transactions.map(function(t) {
				t.account = account;
				console.log(t);
				return t;
			});
		});

		$scope.filteredItems = $scope.transactions;

		$scope.groupToPages();
	});

	$scope.groupToPages = function () {
		$scope.pagedItems = [];

		for (var i = 0; i < $scope.filteredItems.length; i++) {
			if (i % $scope.pagination.itemsPerPage === 0) {
				$scope.pagedItems[Math.floor(i / $scope.pagination.itemsPerPage)] = [ $scope.filteredItems[i] ];
			} else {
				$scope.pagedItems[Math.floor(i / $scope.pagination.itemsPerPage)].push($scope.filteredItems[i]);
			}
		}

		var pages = $scope.pagination.range =  Math.ceil($scope.filteredItems.length / $scope.pagination.itemsPerPage);
		$scope.pagination.range = Array.apply(null, {length: pages}).map(Number.call, Number)

	};

	$scope.prevPage = function () {
		if ($scope.pagination.currentPage > 0) {
			$scope.pagination.currentPage--;
		}
	};

	$scope.nextPage = function () {
		if ($scope.pagination.currentPage < $scope.pagedItems.length - 1) {
			$scope.pagination.currentPage++;
		}
	};

	$scope.setPage = function () {
		$scope.pagination.currentPage = this.n;
	};

});