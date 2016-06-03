'use strict';

/**
 * @ngdoc function
 * @name smappApp.controller:PortfolioCtrl
 * @description
 * # PortfolioCtrl
 * Controller of the smappApp
 */
angular.module('smappApp').controller('PortfolioCtrl', function ($scope, shares, ModalContext, accounts, AccountsData) {

    $scope.myShares = [];
    $scope.linkedAccounts = [];
    $scope.data = [];
    $scope.legend = null;

    //sets up the doughnut chart data
    $scope.setupChartData = function(myShares){
      $scope.data = [];
      var netAsset = null;
      angular.forEach(myShares, function(item){
        var chartData = {
          value: (item.price * item.quantity).toFixed(2),
          color: getRandomColor(),
          label: item.name
        };
        $scope.data.push(chartData);
        netAsset = netAsset + Number((item.price * item.quantity).toFixed(2));
      });
      $scope.legend = 'Total Asset Value: $'+ netAsset;
    };

    //setting intial linked account details
    function setupInitialAccountData(){
      console.log(JSON.stringify(accounts.data));
      angular.forEach(accounts.data, function(item){
        var account = AccountsData.newAccount(item);
        $scope.linkedAccounts.push(account);
      });
    }

    //setting inital share holding details
    $scope.availableBalance = 14500.23;
    $scope.shareData = shares.data.list.resources;
    angular.forEach($scope.shareData, function(item){
      
      var myShare = {
          name : item.resource.fields.name,
          symbol : item.resource.fields.symbol,
          price : item.resource.fields.price,
          change : item.resource.fields.change,
          changePerc : item.resource.fields.chg_percent,
          dayHigh : item.resource.fields.day_high,
          dayLow : item.resource.fields.day_low,
          yearHigh : item.resource.fields.year_high,
          yearLow : item.resource.fields.year_low,
          quantity: 4
      } ;      

      updateMyShares(myShare,'none');      

    }); 

    setupInitialAccountData();

    $scope.setupChartData($scope.myShares);

    //to select random color palette for the chart
    function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
    }

    // Chart.js Options
    $scope.options =  {
      responsive: true,
      segmentShowStroke : true,
      segmentStrokeColor : '#fff',
      segmentStrokeWidth : 2,
      percentageInnerCutout : 50, 
      animationSteps : 10,
      animationEasing : 'easeOutSine',
      animateRotate : true,
      animateScale : false,
      legendTemplate : ''
    };

    //update the list of shares based on the changes
    function updateMyShares(shareToCheck, transaction){
      var shareExists = false;
      if($scope.myShares.length > 0){
        angular.forEach($scope.myShares, function(item, index){
          if(item.symbol === shareToCheck.symbol){
              shareExists = true;
              item.price = shareToCheck.price;
              item.change = shareToCheck.change;
              item.changePerc = shareToCheck.changePerc;
              item.dayLow = shareToCheck.dayLow;
              item.dayHigh = shareToCheck.dayHigh;
              item.yearLow = shareToCheck.yearLow;
              item.yearHigh = shareToCheck.yearHigh;
              switch (transaction){
                case 'none': 
                          item.quantity = shareToCheck.quantity;
                          break;
                case 'buy':
                          item.quantity = item.quantity + shareToCheck.quantity;
                          break;
                case 'sell':
                          item.quantity = item.quantity - shareToCheck.sellQuantity;
                          break;
              }
              if(item.quantity === 0){
                $scope.myShares.splice(index, 1);
              }
          }
        });
      }

      if(!shareExists){
        $scope.myShares.push(shareToCheck);
      }   
    }

    //Opens the popup to add/remove linked accounts the list is updated accordingly
    $scope.showLinkedAccounts = function() {    
      var operation = ModalContext.modalLinkedAccounts($scope.linkedAccounts).result;
      operation.then( function( result ) {
        $scope.linkedAccounts = result;
      });
    };

    //Opens the popup to buy shares and the shares list, chart and balance are updated with the changes
    $scope.openBuyModal = function(){

      var operation = ModalContext.modalBuyShare($scope.availableBalance).result;
      operation.then(function(result){
        updateMyShares(result,'buy');

        //reset chart data
        $scope.setupChartData($scope.myShares);

        //update available bal
        var toatlPurchaseValue = result.price * result.quantity;
        $scope.availableBalance = $scope.availableBalance - toatlPurchaseValue;
      });
    };

    //Opens the popup to sell shares the shares list, chart and balance are updated with the changes
    $scope.openSellModal = function(){
      var operation = ModalContext.modalSellShare($scope.myShares).result;
      operation.then(function(result){
        updateMyShares(result, 'sell');

        //reset chart data
        $scope.setupChartData($scope.myShares);

        //update available bal
        var toatlPurchaseValue = result.price * result.sellQuantity;
        $scope.availableBalance = $scope.availableBalance + toatlPurchaseValue;
      });
    };

    //Opens the popup to transfer funds and balance and liked account details are updated with the changes
    $scope.transferFunds = function() {
      var operation = ModalContext.modalTransferFunds($scope.linkedAccounts, $scope.availableBalance).result;
      operation.then( function(result){
        $scope.availableBalance = result.balance;
        angular.forEach($scope.linkedAccounts, function(item){
          if(item.accountName === result.account.accountName && item.bsb === result.account.bsb && item.acctNo === result.account.acctNo){
            item.balance = result.account.balance;
          }
        });
      });
    };

});
