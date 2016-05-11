'use strict';

angular.module('mani').service('categoriesService', function CategoriesService($http) {

    console.log('categories service loaded');


    this.findCategories = function(filter) {
        return $http({
            url: 'http://localhost:8080/categories?filter='+filter,
            method: "GET"
        });
    };

});