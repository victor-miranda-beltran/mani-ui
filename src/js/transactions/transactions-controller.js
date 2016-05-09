'use strict';

angular.module('mani').controller('TransactionsController', function TransactionsController($scope, transactionsService){

	$scope.pagination = {
		itemsPerPage: 10,
		currentPage: 0,
		pagesShown: 10
	};

	$scope.pagedItems= [];
	$scope.selectedAccounts = [];
	$scope.filteredItems = [];
	$scope.transactionFilter = '';

	$scope.filter = {
		transactionName: '',
		amountMin: undefined,
		amountMax: undefined,
		dateStart: '',
		dateEnd: ''
	};

	$scope.updateFilter = function(){

		if (!$scope.transactions) {
			return;
		}

		console.log($scope.accounts);

		var shownAccounts = $scope.accounts.filter(function(a) {return a.shown;}).map(function(a){return a.accountId});

		$scope.filteredItems = $scope.transactions
				//account filter
				.filter(
					function(t) {
						return shownAccounts.filter(function(a){ return a == t.accountId}).length == 1;
					})
				//amount filter
				.filter(
						function(t) {
							var min = $scope.filter.amountMin || 0;
							var max = $scope.filter.amountMax || 10000;
							return t.amount >= min && t.amount <= max;
						})
				//description filter
				.filter(
					function(t) {
						return t.description.toLowerCase().indexOf( $scope.transactionFilter.toLowerCase()) != -1;
					})
			;
		$scope.pagination.currentPage = 0;

		$scope.groupToPages();
	};

	var updateTotalAmounts = function() {

		$scope.filteredExpenditure = $scope.filteredItems.filter(function(t){
			return t.flow === 'OUT'
		}).reduce(function(a,b) {
			return a.amount || a + b.amount;
		}, 0);

		$scope.filteredIncome = $scope.filteredItems.filter(function(t){
			return t.flow === 'IN'
		}).reduce(function(a,b) {
			return a.amount || a + b.amount;
		}, 0);
	};

	transactionsService.getTransactions(function(transactions){

		$scope.transactions = transactions;
		$scope.accounts = [];

		transactions.forEach(function(t) {
			if (!$scope.accounts[t.accountId]) {
				$scope.accounts[t.accountId] = {
					accountId : t.accountId,
					accountName : t.accountName,
					shown: true
				}
			}
		});

		$scope.filteredItems = $scope.transactions.sort(function(t1, t2) {
			return t2.date - t1.date;
		});

		$scope.groupToPages();
	});

	$scope.groupToPages = function () {
		updateTotalAmounts();
		$scope.pagedItems = [];

		for (var i = 0; i < $scope.filteredItems.length; i++) {
			if (i % $scope.pagination.itemsPerPage === 0) {
				$scope.pagedItems[Math.floor(i / $scope.pagination.itemsPerPage)] = [ $scope.filteredItems[i] ];
			} else {
				$scope.pagedItems[Math.floor(i / $scope.pagination.itemsPerPage)].push($scope.filteredItems[i]);
			}
		}

		movePagination();

	};

	var movePagination = function() {

		var pages = Math.ceil($scope.filteredItems.length / $scope.pagination.itemsPerPage);
		$scope.pagination.range = Array.apply(null, {length: pages}).map(Number.call, Number);

		if (pages > $scope.pagination.pagesShown) {
			var itemsToRemove = pages - $scope.pagination.pagesShown;
			var init = $scope.pagination.currentPage - Math.floor($scope.pagination.pagesShown / 2);
			if (init < 0) {
				init = 0;
			}
			if (init + $scope.pagination.pagesShown > pages) {
				init = pages -  $scope.pagination.pagesShown;
			}

			$scope.pagination.range = $scope.pagination.range.slice(init, init + $scope.pagination.pagesShown);
		}
	};

	$scope.prevPage = function () {
		if ($scope.pagination.currentPage > 0) {
			$scope.pagination.currentPage--;
			movePagination();
		}

	};

	$scope.nextPage = function () {
		if ($scope.pagination.currentPage < $scope.pagedItems.length - 1) {
			$scope.pagination.currentPage++;
			movePagination();
		}
	};

	$scope.loadCategories = function(query) {
		return [{ id:1, name: 'Groceries' }, {  id:2, name: 'Online shopping' }, { id: 3, name: 'Salary' }, { id:4,name: 'Yeah' }];
	};


	$scope.setPage = function (page) {
		$scope.pagination.currentPage = page !== undefined ? page : this.n;

		console.log($scope.pagination.currentPage);
		movePagination();
	};

});