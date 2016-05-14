'use strict';

angular.module('mani').service('categoriesService', function CategoriesService($http) {

    console.log('categories service loaded');


    this.findCategories = function(filter) {
        return $http({
            url: 'http://192.168.0.2:9002/categories?filter='+filter,
            method: "GET"
        });
    };

});