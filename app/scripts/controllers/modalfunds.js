'use strict';

/**
 * @ngdoc function
 * @name smappApp.controller:ModalTransferFundsCtrl
 * @description
 * # ModalTransferFundsCtrl
 * Controller of the smappApp
 */
 angular.module('smappApp').controller('ModalTransferFundsCtrl', function($scope, $uibModalInstance, accounts, balance){

 	$scope.accounts = angular.copy(accounts);
 	$scope.availableBalance = angular.copy(balance);
 	$scope.transaction = {};
 	$scope.errorMessage = undefined;
 	$scope.selectedAccount = undefined;

 	
 	$scope.cancel = function(){
 		$uibModalInstance.dismiss('cancel');
 	};

 	//the balances are updated based of if it is a credit or debit transaction
 	// if credit transaction, the total available cash balance is increased with the amount entered and deducted from the selected account
 	// if debit transaction, the total available cash balance is deducted with the amount entered and credited to selected account.
 	$scope.ok = function(){ 
 		if( validateTransferAmount() ) {
 			$scope.errorMessage = undefined;
 			if($scope.transaction.credit) {
 				$scope.availableBalance = $scope.availableBalance + $scope.transaction.amount;
 				$scope.selectedAccount.balance = Number($scope.selectedAccount.balance) - $scope.transaction.amount;
 			} else {
 				$scope.availableBalance = $scope.availableBalance - $scope.transaction.amount;
 				$scope.selectedAccount.balance = Number($scope.selectedAccount.balance) + $scope.transaction.amount;
 			}
 			var result = {
 				balance: $scope.availableBalance,
 				account: $scope.selectedAccount
 			};
 			$uibModalInstance.close(result);
 		} else{
 			$scope.errorMessage = 'Enter a valid amount';
 		}
 		
 	};

 	//To display a concatenated account details in the dropdown
 	$scope.combined = function(account) {
 		return account.accountName + '/' + account.bsb + '/' + account.acctNo;
 	};

 	function validateTransferAmount(){

 		if($scope.transaction.credit && ( $scope.transaction.amount > $scope.selectedAccount.balance )) {
 			return false; 
 		} else if(!$scope.transaction.credit  && ( $scope.transaction.amount > $scope.availableBalance)) {
 			return false;
 		} else {
 			return true;
 		}
 	}

 	//reset the values if we change the transaction type
 	$scope.reset = function() {
 		
 		$scope.accounts = angular.copy(accounts);
	 	$scope.availableBalance = angular.copy(balance);
	 	$scope.errorMessage = undefined;
	 	$scope.selectedAccount = undefined;
	 	$scope.transaction.amount = undefined;
	 };
	 	
 });