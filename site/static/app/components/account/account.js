/*!
 * Account module.
 *
 * Copyright (c) 2012-2014 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([
  'angular',
  './account-balance-details-directive',
  './account-balance-directive',
  './account-balance-summary-directive',
  './account-controller',
  './account-routes',
  './account-selection-directive',
  './account-selector-directive',
  './account-service',
  './accounts-directive',
  './add-account-modal-directive',
  './add-credit-line-modal-directive',
  './deposit-modal-directive',
  './edit-account-modal-directive',
  './update-account-button-directive',
  './withdraw-modal-directive'
], function(
  angular,
  accountBalanceDetailsDirective,
  accountBalanceDirective,
  accountBalanceSummaryDirective,
  accountController,
  accountRoutes,
  accountSelectionDirective,
  accountSelectorDirective,
  accountService,
  accountsDirective,
  addAccountModalDirective,
  addCreditLineModalDirective,
  depositModalDirective,
  editAccountModalDirective,
  updateAccountButtonDirective,
  withdrawModalDirective
) {

'use strict';

var module = angular.module('app.account', []);

module.directive(accountBalanceDetailsDirective);
module.directive(accountBalanceDirective);
module.directive(accountBalanceSummaryDirective);
module.controller(accountController);
module.directive(accountSelectionDirective);
module.directive(accountSelectorDirective);
module.service(accountService);
module.directive(accountsDirective);
module.directive(addAccountModalDirective);
module.directive(addCreditLineModalDirective);
module.directive(depositModalDirective);
module.directive(editAccountModalDirective);
module.directive(updateAccountButtonDirective);
module.directive(withdrawModalDirective);

module.config(['$routeProvider',
  function($routeProvider) {
    angular.forEach(accountRoutes, function(route) {
      $routeProvider.when(route.path, route.options);
    });
  }
]);

return module.name;

});
