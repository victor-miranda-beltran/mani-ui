'use strict';

angular.module('mani').service('datesService', function DatesService(){

   this.startOfThisMonth = function() {
       var now = new Date();
       return new Date(now.getFullYear(), now.getMonth() , 1);
   };

    this.startOfThisYear = function() {
        var now = new Date();
        return new Date(now.getFullYear(), 0 , 1);
    };

    this.startOfPreviousMonth = function() {
        var startOfThisMonth = this.startOfThisMonth();
        return new Date(startOfThisMonth.getFullYear(), startOfThisMonth.getMonth() - 1, 1);
    };

    this.startOfPreviousYear = function() {
        var now = new Date();
        return new Date(now.getFullYear()  -  1, 0 , 1);
    };

    this.endOfPreviousMonth = function() {
        var startOfThisMonth = this.startOfThisMonth();

        var dateOffset = (24*60*60*1000); //5 days
        var myDate = new Date();
        myDate.setTime(startOfThisMonth.getTime() - dateOffset);

        return myDate;
    };

    this.endOfPreviousYear = function() {
        var now = new Date();
        return new Date(now.getFullYear()  -  1, 11 , 31);
    };

    this.getDate =  function(date) {

    };

});