'use strict';

/**
 * @ngdoc function
 * @name smappApp.controller:ModalSellCtrl
 * @description
 * # ModalSellCtrl
 * Controller of the smappApp
 */
 angular.module('smappApp').controller('ModalSellCtrl', function($scope, $uibModalInstance, myShares){

 	$scope.sharesList = myShares;
 	$scope.selectedShareHolding = undefined;

 	//pass the share details selected to be sold
 	$scope.sellShare = function(){ 		
 		$uibModalInstance.close($scope.selectedShareHolding);
 	};

 	$scope.cancel = function(){
 		$uibModalInstance.dismiss('cancel');
 	};
	
 });