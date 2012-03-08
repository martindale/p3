/*
 * Copyright (c) 2012 Digital Bazaar, Inc. All rights reserved.
 */
var async = require('async');
var payswarm = {
  config: require('./payswarm.config'),
  db: require('./payswarm.database'),
  identity: require('./payswarm.identity'),
  logger: require('./payswarm.logger'),
  permission: require('./payswarm.permission'),
  profile: require('./payswarm.profile'),
  security: require('./payswarm.security'),
  // financial sub modules
  financial: {
    account: require('./payswarm.financial.account'),
    budget: require('./payswarm.financial.budget'),
    contract: require('./payswarm.financial.contract'),
    deposit: require('./payswarm.financial.deposit'),
    paymentToken: require('./payswarm.financial.paymentToken'),
    transaction: require('./payswarm.financial.transaction'),
    transfer: require('./payswarm.financial.transfer'),
    withdrawal: require('./payswarm.financial.withdrawal')
  }
};

// constants
var MODULE_TYPE = 'payswarm.financial';
var MODULE_IRI = 'https://payswarm.com/modules/financial';

// module API
var api = {};
api.name = MODULE_TYPE + '.Financial';
api.type = MODULE_TYPE;
api.iri = MODULE_IRI;
module.exports = payswarm.tools.extend(
  api,
  // sub modules
  payswarm.financial.account,
  payswarm.financial.budget,
  payswarm.financial.paymentToken,
  payswarm.financial.contract,
  payswarm.financial.deposit,
  payswarm.financial.transfer,
  payswarm.financial.withdrawal
);

/**
 * Initializes this module.
 *
 * @param app the application to initialize this module for.
 * @param callback(err) called once the operation completes.
 */
api.init = function(app, callback) {
  // do initialization work
  async.waterfall([
    _registerPermissions,
    payswarm.financial.account.init,
    payswarm.financial.budget.init,
    payswarm.financial.paymentToken.init,
    payswarm.financial.contract.init,
    payswarm.financial.deposit.init,
    payswarm.financial.transfer.init,
    payswarm.financial.withdrawal.init
  ], callback);
};
