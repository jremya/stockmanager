'use strict';

/**
 * @ngdoc function
 * @name smappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smappApp
 */
angular.module('smappApp').controller('MainCtrl', function ($scope, $location) {
    
    $scope.goToPortfolio = function(){
    	$location.path('/portfolio');
    };

  });
