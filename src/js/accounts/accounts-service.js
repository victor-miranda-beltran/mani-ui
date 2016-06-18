'use strict';

angular.module('mani').service('accountsService', function AccountsService($http){

    this.getAccounts = function(callback, errorFn) {
        $http.get(API_URL + 'accounts')
            .then(function(res){

                var accounts = res.data;

                accounts.map(function(a) {a.lastSynced =  new Date(a.lastSynced[0], a.lastSynced[1] - 1, a.lastSynced[2], 0, 0, 0, 0);return a;})
                callback(res.data);
            });
    };


    this.getBalances = function(callback) {
        $http.get(API_URL + 'balanceEvolution')
            .then(function(res) {
                var balances = res.data;

                balances.map(function (b) {
                    b.dayBalance.map(
                        function(db) {
                            var date = db.day.split('-');
                            db.day = new Date(date[0], date[1], date[2], 0,0,0,0);
                            return db;}
                    );
                    return b;
                });
                callback(balances)
            });
    }
});
