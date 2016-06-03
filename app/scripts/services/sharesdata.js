'use strict';

/**
 * @ngdoc function
 * @name smappApp.service:sharesData
 * @description
 * # sharesData
 * Service of the smappApp
 */
 angular.module('smappApp').service('SharesData', function($http){

 	//Service for handling all share details

 	function Share(symbol){
 		this.name = null;
 		this.symbol = symbol;
 		this.price = 0.00;
 		this.change = 0.0;
 		this.changePerc = 0;
 		this.dayHigh = 0;
 		this.dayLow = 0;
 		this.yearHigh = 0;
 		this.yearLow = 0;

 	}

 	function newShare(symbol) {
			// instantiate a prototype object
			var theShare = new Share(symbol);
			// return Deal Object to the consumer
			return theShare;
	}

	function getShareData(symbols) {
        //var promise = $http.get('https://finance.yahoo.com/webservice/v1/symbols/'+symbols+'/quote?format=json&view=detail');

        var promise = $http({
	        method: 'jsonp',
	        url: 'https://finance.yahoo.com/webservice/v1/symbols/'+symbols+'/quote?format=json&view=detail',
	        params: {
	            format: 'jsonp',
	            callback: 'JSON_CALLBACK'
	        }
    	});

    	promise.success(function(data) {
	        return data;
	    });
        return promise;
    }

	return {
		newShare: newShare,
		getShareData: getShareData
	};

 });