'use strict';

angular.module('mani').controller('DashboardController',
    function DashboardController($scope, transactionsService,accountsService, categoriesService, $filter) {

        $scope.hi = 'helloDAsh';
        $scope.showDarkTheme = true;
        $scope.balances = [];

        accountsService.getBalances(function (res) {
            console.log('balancing');

            $scope.balance = res.filter(function (a) {
                return a.accountInfo.accountNumber == "6956";
            })[0];

            $scope.data = [{
                key: "Balance",
                values: $scope.balance.dayBalance.splice(200)
            }];

        });

        $scope.xFunction = function () {
            return function (d) {
                return d.day;
            }
        };

        $scope.yFunction = function () {
            return function (d) {
                return d.balance;
            }
        };


        $scope.dateFormat = function () {
            return function (d) {
                return $filter('date')(new Date(d), "dd/MM/yyyy") ;
            }
        };

    }


);