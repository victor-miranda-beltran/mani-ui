'use strict';

angular.module('mani').controller('TransactionsController', function TransactionsController($scope, transactionsService, categoriesService){

	$scope.pagination = {
		itemsPerPage: 10,
		currentPage: 0,
		pagesShown: 5
	};

	$scope.pagedItems= [];
	$scope.selectedAccounts = [];
	$scope.filteredItems = [];
	$scope.transactionFilter = '';

	$scope.filter = {
		transactionName: '',
		amountMin: undefined,
		amountMax: undefined,
		categories: [],
		dateStart: '',
		dateEnd: ''
	};

	$scope.categoryUpdated = function(transaction, cat) {
		transactionsService.setCategory(transaction, cat);
	};

	$scope.updateFilter = function(){

		console.log('updating filter');
		if (!$scope.transactions) {
			return;
		}

		var shownAccounts = $scope.accounts.filter(function(a) {return a.shown;}).map(function(a){return a.accountId});
		var shownCategories = $scope.filter.categories.map(function(a){return a.id});

		$scope.filteredItems = $scope.transactions
				//account filter
				.filter(
					function(t) {
						return shownAccounts.filter(function(a){ return a == t.account.id}).length == 1;
					})
				//category filter
				.filter(
						function(t) {
							if (!shownCategories || !shownCategories.length) {
								return true;
							} else if (!t.category) {
								return false;
							}
							return shownCategories.indexOf(t.category[0].id) !== -1;
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
			if (!$scope.accounts[t.account.id]) {
				$scope.accounts[t.account.id] = {
					accountId : t.account.id,
					accountName : t.account.alias,
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
		console.log(query);
		return categoriesService.findCategories(query);
	};


	$scope.setPage = function (page) {
		$scope.pagination.currentPage = page !== undefined ? page : this.n;

		console.log($scope.pagination.currentPage);
		movePagination();
	};

});