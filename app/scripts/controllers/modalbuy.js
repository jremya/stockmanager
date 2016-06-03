'use strict';

/**
 * @ngdoc function
 * @name smappApp.controller:ModalBuyCtrl
 * @description
 * # ModalBuyCtrl
 * Controller of the smappApp
 */
 angular.module('smappApp').controller('ModalBuyCtrl', function($scope, $uibModalInstance, SharesData, availableBalance){

 	$scope.shareBought = undefined;
 	$scope.searchStr = undefined;
 	$scope.errorMessage = undefined;

 	$scope.buyShare = function(){
 		var totalPurchasePrice = $scope.shareBought.price * $scope.shareBought.quantity;
 		if(totalPurchasePrice > availableBalance){
 			$scope.errorMessage = 'Purchase cancelled due to insufficient balance.';
 		}else{
 			$uibModalInstance.close( $scope.shareBought );	
 		}
 		
 	};

 	//cancels the popup without any changes
 	$scope.cancel = function(){
 		$uibModalInstance.dismiss('cancel');
 	};

 	$scope.clearSearchString = function(){
 		$scope.searchStr = undefined; 		
 	};

 	//searches the data from the live api and sets all the details
 	$scope.searchTickerDetails = function(){
 		$scope.shareBought = undefined;
 		$scope.errorMessage = undefined;
 		var response = SharesData.getShareData($scope.searchStr.toUpperCase());
 		response.success(function(data){
 			if(data.list.resources.length === 0){
 				$scope.errorMessage = 'Not found';
 			}else{
 				$scope.errorMessage = undefined;
 				$scope.shareBought = {
	 				name : data.list.resources[0].resource.fields.name,
	          		symbol : data.list.resources[0].resource.fields.symbol,
	          		price : data.list.resources[0].resource.fields.price,
	          		change : data.list.resources[0].resource.fields.change,
	          		changePerc : data.list.resources[0].resource.fields.chg_percent,
	          		dayHigh : data.list.resources[0].resource.fields.day_high,
	          		dayLow : data.list.resources[0].resource.fields.day_low,
	          		yearHigh : data.list.resources[0].resource.fields.year_high,
	          		yearLow : data.list.resources[0].resource.fields.year_low
 				};
 			} 			
 		}); 		
 	};
 });