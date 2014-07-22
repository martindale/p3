/*!
 * Transaction details directive.
 *
 * @author Digital Bazaar
 */
define(['angular', 'jsonld'], function(angular, jsonld) {

'use strict';

/* @ngInject */
function factory(AccountService) {
  return {
    scope: {
      transaction: '=transactionDetails',
      source: '=',
      destination: '=',
      complete: '@'
    },
    templateUrl: '/app/components/transaction/transaction-details.html',
    link: Link
  };

  function Link(scope) {
    // public account info
    // map of id to {loading: <boolean>, label: <string>}
    scope.accounts = {};
    // main transaction display type
    scope.type = null;

    scope.$watch('transaction', function(value) {
      if(!value) {
        return;
      }
      if(jsonld.hasValue(value, 'type', 'Deposit')) {
        scope.type = 'Deposit';
      } else if(jsonld.hasValue(value, 'type', 'Withdrawal')) {
        scope.type = 'Withdrawal';
        // get source account info
        return getAccount(value.transfer[0].source).then(function() {
          scope.$apply();
        });
      } else {
        // FIXME: ?
        scope.type = 'Transfer';
      }
      // find and load unknown account info
      // FIXME: improve source/dest/token/account handling
      angular.forEach(value.transfer, function(xfer) {
        // skip for withdrawals to a payment token
        if((scope.type == 'Withdrawal' &&
          value.destination && (xfer.destination == value.destination.id))) {
          return;
        }
        getAccount(xfer.destination).then(function() {
          scope.$apply();
        });
      });
    });

    function getAccount(accountId) {
      // done if already loaded or loading
      if(accountId in scope.accounts) {
        return Promise.resolve();
      }
      var info = scope.accounts[accountId] = {
        loading: true,
        label: ''
      };
      return AccountService.collection.get(accountId).then(function(account) {
        info.label = account.label;
      }).catch(function() {
        info.label = 'Private Account';
      }).then(function() {
        info.loading = false;
      });
    }
  }
}

return {transactionDetails: factory};

});
