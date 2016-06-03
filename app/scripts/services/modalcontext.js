'use strict';

/**
 * @ngdoc function
 * @name smappApp.service:modalContext
 * @description
 * # modalContext
 * Service of the smappApp
 */
 angular.module('smappApp').service('ModalContext', function($uibModal){

    //Service for managinf all modals

 	function modalBuyShare(availableBalance) {
        return $uibModal.open({
            controller: 'ModalBuyCtrl',
            templateUrl: 'views/modalbuy.html',
            backdrop: 'static',
            resolve: {
                availableBalance: function() { return availableBalance; }
            }
        });
    }

    function modalSellShare(myShares) {
        return $uibModal.open({
            controller: 'ModalSellCtrl',
            templateUrl: 'views/modalsell.html',
            backdrop: 'static',
            resolve: {
                myShares: function() { return myShares; }
            }
        });
    }

    function modalLinkedAccounts(linkedAccounts) {
        return $uibModal.open({
            controller: 'ModalAccountCtrl',
            templateUrl: 'views/modallinkedaccounts.html',
            backdrop: 'static',
            resolve: {
                accounts: function() { return linkedAccounts; }
            }
        });
    }

    function modalTransferFunds(linkedAccounts, availableBalance) {
        return $uibModal.open({
            controller: 'ModalTransferFundsCtrl',
            templateUrl: 'views/modaltransferfunds.html',
            backdrop: 'static',
            resolve: {
                accounts: function() { return linkedAccounts; },
                balance: function() { return availableBalance; }
            }

        });

    }

    return{
    	modalBuyShare: modalBuyShare,
        modalSellShare: modalSellShare,
        modalLinkedAccounts: modalLinkedAccounts,
        modalTransferFunds: modalTransferFunds
    };


 });