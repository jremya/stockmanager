'use strict';

describe('Controller: PortfolioCtrl', function () {

  // load the controller's module
  beforeEach(module('smappApp'));

  var PortfolioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PortfolioCtrl = $controller('PortfolioCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of accounts to the scope', function () {
    expect(PortfolioCtrl.linkedAccounts.length).toBe(2);
  });

  it('should attach a list of shares to the scope', function () {
    expect(PortfolioCtrl.myShares.length).toBe(3);
  });
});
