'use strict';

/**
 * @ngdoc overview
 * @name smappApp
 * @description
 * # smappApp
 *
 * Main module of the application.
 */
angular
  .module('smappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'tc.chartjs',
    'ui.bootstrap'    
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/portfolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'PortfolioCtrl',
        controllerAs: 'portfolio',
        resolve: {
          shares: function(SharesData){
            return SharesData.getShareData('GOOG,AAPL,YHOO');
          },
          accounts: function(AccountsData){
            return AccountsData.getInitialAccountsData();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
