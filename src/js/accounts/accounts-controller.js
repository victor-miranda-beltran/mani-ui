'use strict';

angular.module('mani').controller('AccountsController', function AccountsController($scope, accountsService){

    $scope.hi = 'hello accounts';
    $scope.accounts = [];

    accountsService.getAccounts(function(res) {
        $scope.accounts = res;
    });

    $scope.updateAccountAlias = function(account) {
        accountsService.updateAccountAlias(account);
    };

});