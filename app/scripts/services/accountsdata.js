'use strict';

/**
 * @ngdoc function
 * @name smappApp.service:AccountsData
 * @description
 * # AccountsData
 * Service of the smappApp
 */
 angular.module('smappApp').service('AccountsData', function($http){

    // Service for handling account details

 	function Account(obj){
 		this.accountName = obj.accountName;
 		this.bsb = obj.bsb;
 		this.acctNo = obj.acctNo;
        this.balance = (Math.random() * 25000.56).toFixed(2);

 	}

 	function newAccount(obj) {
			// instantiate a prototype object
			var theAccount = new Account(obj);
			// return Deal Object to the consumer
			return theAccount;
	}

	function getInitialAccountsData() {
        var promise = $http.get('misc/data.json');

    	promise.success(function(data) {
	        return data;
	    });
        return promise;
    }

    function createEmptyAccount(accountsList) {
    	var obj = {
    		accountName: null,
    		bsb: null,
    		acctNo: null,
            balance: (Math.random() * 25000.56).toFixed(2)
    	};

        accountsList.push(obj);
        return obj;
    }

	return {
		getInitialAccountsData: getInitialAccountsData,
		newAccount: newAccount,
		createEmptyAccount: createEmptyAccount
	};

 });