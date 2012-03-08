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
  security: require('./payswarm.security')
};

// constants
var MODULE_TYPE = payswarm.financial.type;
var MODULE_IRI = payswarm.financial.iri;

// sub module API
var api = {};
module.exports = api;

/**
 * Initializes this module.
 *
 * @param callback(err) called once the operation completes.
 */
api.init = function(callback) {
  callback();
};

/**
 * Generates the next Transaction ID.
 *
 * @param callback(err, id) called once the operation completes.
 */
api.generateTransactionId = function(callback) {
  // FIXME: implement me
};

/**
 * Voids an unsettled Transaction.
 *
 * @param actor the profile performing the action.
 * @param transaction the Transaction (can be a Deposit, Withdrawal, etc.) to
 *          void.
 * @param callback(err) called once the operation completes.
 */
api.voidTransaction = function(actor, transaction, callback) {
  // FIXME: implement me
};

// FIXME: update docs for this ...
/**
 * Populates the transactions associated with the given query.
 *
 * The query *must* contain "start" and "num" limitations. The query can
 * contain identity, account, asset, and license filtering information. It
 * can also specify a start and end date.
 *
 * start - the starting transaction index, 0 for the first one.
 * num - the maximum number of transactions to return.
 * identityId - the ID of the identity.
 * source - the source account ID.
 * destination - the destination account ID.
 * referenceId - the vendor-specified reference ID.
 * assetHash - the hash of the asset.
 * licenseHash - the hash of the license.
 * date.start - the starting date.
 * date.end - the ending date.
 * purchases - true to return only Contracts for a particular identityId,
 *    account query parameters will be ignored (default: false).
 * details - true to return the full details of the transaction (eg: full
 *    Contract details), (default: true).
 *
 * Advanced options:
 * assetIdxKey - the index key for the asset.
 * identityIdxKey - the index key for the identity.
 * accountSecIdxKey - the index key for the source account.
 * accountDstIdxKey - the index key for the destination account.
 *
 * @param actor the profile performing the action.
 * @param query the query.
 * @param result the result set with transactions.
 *
 * @return true on success, false on failure with exception set.
 */
api.getTransactions = function(actor, query, callback) {
  // FIXME: implement me

  // FIXME: until mongodb supports sparse multifield indexes, store the
  // transaction ID in the assetKey position for deposits, withdrawals, etc.
};
