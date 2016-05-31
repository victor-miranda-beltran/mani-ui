'use strict';

angular.module('mani').controller('TransactionsController', function TransactionsController($scope, transactionsService, categoriesService){


	$scope.selectedAccounts = [];
	$scope.filteredItems = [];
	$scope.categoriesFiltered = [];

	$scope.filter = {
		description: '',
		amountMin: undefined,
		amountMax: undefined,
		categories: [],
		dateStart: '',
		dateEnd: '',
		slider : {
			min: 0,
			max: 3000,
			options: {
				floor: 0,
				ceil: 3000,
				translate: function(value) {
					return '&euro;' + value;
				},
				onChange: function() {
					$scope.updateFilter();
				}
			}
			}
	};


	$scope.categoryUpdated = function(transaction) {
		transactionsService.setCategory(transaction, function(res) {

			res.forEach(function(tmod){
				var tOriginal = $scope.transactions.filter(function(t){return t.id == tmod.id;})[0];
				tOriginal.category = [tmod.category];
				console.log(tOriginal);
				return tmod;
			});


			$scope.updateFilter();
		});
	};

	$scope.categoryDeleted = function(transaction) {
		transactionsService.deleteCategory(transaction);
	};

	$scope.showOptions = false;

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
							return t.category.length && shownCategories.indexOf(t.category[0].id) !== -1;
						})
				//amount filter
				.filter(
						function(t) {
							var min = $scope.filter.slider.min || 0;
							var max = $scope.filter.slider.max || 10000;
							return t.amount >= min && t.amount <= max;
						})
				//description filter
				.filter(
					function(t) {
						return t.description.toLowerCase().indexOf( $scope.filter.description.toLowerCase()) != -1;
					})
			;

		var highest = Math.max.apply(this,$scope.transactions.map( function(o){ return o.amount; }));
		console.log(highest);

		$scope.filter.slider.options.ceil = 5000;

	};


	transactionsService.getTransactions(function(transactions){

		$scope.transactions = transactions;
		$scope.accounts = [];

		transactions.forEach(function(t) {

			if ($scope.accounts.filter(function(a) {return a.accountId == t.account.id;}).length == 0) {
				$scope.accounts.push({
					accountId : t.account.id,
					accountName : t.account.alias,
					shown: true
				});
			}
			if (!t.category) {
				t.category = [];
			}
		});

		$scope.filteredItems = $scope.transactions.sort(function(t1, t2) {
			return t2.date - t1.date;
		});


		$scope.updateFilter();
	});

	$scope.loadCategories = function(query) {

		categoriesService.findCategories(query)
			.success(function (response) {
				$scope.categoriesFiltered = response;
			});
	};

});