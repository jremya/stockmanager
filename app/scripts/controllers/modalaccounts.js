'use strict';

/**
 * @ngdoc function
 * @name smappApp.controller:ModalAccountCtrl
 * @description
 * # ModalAccountCtrl
 * Controller of the smappApp
 */
 angular.module('smappApp').controller('ModalAccountCtrl', function($scope, $uibModalInstance, accounts, AccountsData){

 	$scope.accounts = angular.copy(accounts);
 	$scope.newAccount = {};

 	$scope.addAccount = function(){
 		AccountsData.createEmptyAccount($scope.accounts);
  	};

 	$scope.cancel = function(){
 		$uibModalInstance.dismiss('cancel');
 	};

 	$scope.ok = function(){ 
 		$uibModalInstance.close($scope.accounts);
 	};

 	$scope.removeAccount = function(account){

 		angular.forEach($scope.accounts,function(item, index){
 			if(item.accountName === account.accountName && item.bsb === account.bsb && item.acctNo === account.acctNo){
 				$scope.accounts.splice(index, 1);
 			}
 		});
 	};
 	
 });