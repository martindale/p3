/*!
 * Edit Account Modal.
 *
 * @author Dave Longley
 */
define(['angular'], function(angular) {

'use strict';

/* @ngInject */
function factory(
  psAccountService, brAlertService, brIdentityService, psPaymentTokenService, config) {
  return {
    restrict: 'A',
    scope: {sourceAccount: '=psAccount'},
    require: '^stackable',
    templateUrl: '/app/components/account/edit-account-modal.html',
    link: Link
  };

  function Link(scope, element, attrs, stackable) {
    var model = scope.model = {};
    model.identity = brIdentityService.identity;
    var state = model.state = {loading: false};

    // copy account for editing
    var account = model.account = angular.copy(scope.sourceAccount);

    // ensure defaults
    account.sysAllowInstantTransfer = !!account.sysAllowInstantTransfer;
    account.sysMinInstantTransfer = account.sysMinInstantTransfer || '';
    account.creditLimit = account.creditLimit || '0.0000000000';
    account.creditBackedAmount = account.creditBackedAmount || '0.0000000000';

    var creditLimit = parseFloat(account.creditLimit);
    var backedAmount = parseFloat(account.creditBackedAmount);
    model.fullyBackedCredit = (creditLimit - backedAmount) <= 0;
    model.creditDisabled = !!account.sysDisabled;

    model.accountVisibility = (
      account.sysPublic.length === 0 ? 'hidden' : 'public');

    // storage for backupSource object
    // backend needs just a list of ids
    // only use first element if there are more than one
    // use sourceAccount object vs copy to use angular ids
    model.backupSource = null;
    model.backupSourceEnabled = false;
    if(scope.sourceAccount.backupSource &&
      scope.sourceAccount.backupSource[0]) {
      state.loading = true;
      model.backupSourceEnabled = true;
      psPaymentTokenService.collection.getAll().then(function() {
        state.loading = false;
        model.backupSource = psPaymentTokenService.find(
          scope.sourceAccount.backupSource[0]);
        scope.$apply();
      }).catch(function(err) {
        brAlertService.add('error', err, {scope: scope});
        state.loading = false;
        scope.$apply();
      });
    }
    model.showExpirationWarning = false;
    model.showExpired = false;
    model.editing = true;

    model.editAccount = function() {
      brAlertService.clearFeedback();
      var accountUpdate = {
        '@context': config.data.contextUrl,
        id: account.id,
        label: account.label,
        sysPublic: [],
        sysAllowInstantTransfer: account.sysAllowInstantTransfer,
        sysMinInstantTransfer: account.sysMinInstantTransfer || '0'
      };
      if(model.accountVisibility === 'public') {
        accountUpdate.sysPublic.push('label');
        accountUpdate.sysPublic.push('owner');
      }
      // use list of backupSource ids vs objects
      // use empty list if backupSources disabled
      var newBackupSource = (model.backupSourceEnabled ?
        [model.backupSource.id] : []);
      // let server handle add/del operations
      if(!angular.equals(scope.sourceAccount.backupSource, newBackupSource)) {
        accountUpdate.backupSource = newBackupSource;
      }

      state.loading = true;
      psAccountService.collection.update(accountUpdate).then(function(account) {
        state.loading = false;
        stackable.close(null, account);
      }).catch(function(err) {
        brAlertService.add('error', err, {scope: scope});
        state.loading = false;
        scope.$apply();
      });
    };
  }
}

return {psEditAccountModal: factory};

});
