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
 * Creates and populates a new Contract. The Asset acquirer will not be set
 * on the contract until it is signed.
 *
 * If a Listing ID is provided, the Listing will be retrieved, otherwise
 * a the full Listing must be provided. An asset and license may be provided,
 * otherwise they will be retrieved. Providing these options optimize away
 * retrievals.
 *
 * @param actor the profile performing the action.
 * @param options:
 *          listingId: the Listing ID (to look up Listing).
 *          listing: the full Listing (to use given Listing).
 *          listingHash: the Listing hash.
 *          asset: the Asset (optional, will be retrieved otherwise).
 *          license: the License (optional, will be retrieved otherwise).
 *          contract: the contract to populate (with reference ID if applies).
 * @param callback(err, contract) called once the operation completes.
 */
api.createContract = function(actor, options, callback) {
  // FIXME: implement me
};

/**
 * Attempts to add a Payee to a Contract. If the Payee is valid and the
 * Contract's Listing's Payee Rules permit the Payee to be added, it will
 * be. If not, an error will be raised.
 *
 * This must be called before finalizing the Contract.
 *
 * @param contract the Contract to add a Payee to.
 * @param payee the Payee to add.
 * @param options:
 *          maximizeRate: true to try to maximize the Payee's rate based on
 *            the given Payee Rules, false not to (default: false).
 *          ownerType: the owner type for the Payee destination account,
 *            (default: 'identity', other option: 'authority').
 * @param callback(err) called once the operation completes.
 */
api.addPayeeToContract = function(contract, payee, options, callback) {
  // FIXME: implement me
};

/**
 * Creates a new PayeeScheme ID based on the owner's Identity ID and the
 * given name (slug).
 *
 * @param ownerId the ID of the PayeeScheme owner.
 * @param name the name of the PayeeScheme (slug).
 *
 * @return the PayeeScheme ID.
 */
api.createPayeeSchemeId = function(ownerId, name) {
  return util.format('%s/payee-schemes/%s', ownerId, encodeURIComponent(name));
};

/**
 * Adds the Payees from a particular PayeeScheme to the given Contract.
 *
 * This must be called before finalizing the Contract.
 *
 * @param contract the Contract to add the Payees to.
 * @param psId the ID of the PayeeScheme to add Payees from.
 * @param options:
 *          maximizeRate: true to try to maximize the Payee's rate based on
 *            the given Payee Rules, false not to (default: false).
 *          ownerType: the owner type for the Payee destination account,
 *            (default: 'identity', other option: 'authority').
 * @param callback(err) called once the operation completes.
 */
api.addPayeeSchemeToContract(contract, psId, options, callback) {
  // FIXME: implement me
};

/**
 * Validates and finalizes a Contract. This method will not actually process
 * the Contract, it will just assign it a unique ID, set its Asset acquirer,
 * populate its list of Transfers, set a total, and check appropriate
 * information. To process the Contract, call processContract() after it has
 * been reviewed and found to be acceptable by the appropriate Asset
 * provider.
 *
 * The Contract will be cached and can be later retrieved using a call to
 * getCachedContract().
 *
 * After the call returns successfully, the Contract will be the
 * "Asset acquirer's version" and it should not be given to the Asset
 * provider because it will contain identity information.
 *
 * @param actor the profile performing the action.
 * @param contract the Contract to finalize.
 * @param options:
 *          assetAcquirer: the Asset acquirer to use.
 *          acquirerAccountId: the Asset acquirer's Account ID.
 * @param callback(err) called once the operation completes.
 */
api.finalizeContract = function(actor, contract, options, callback) {
  // FIXME: implement me
};

/**
 * Ensures that the Payee amounts in the given Contract meet the minimums
 * specified in the given PayeeScheme.
 *
 * This should be called after finalizing the Contract (which is when
 * Transfers will be generated). This method will be automatically called
 * if the "createFinalizedContract" API is used.
 *
 * @param contract the Contract to check.
 * @param psId the ID of the PayeeScheme to check.
 * @param callback(err) called once the operation completes.
 */
api.checkPayeeAmounts = function(contract, psId, callback) {
  // FIXME: implement me
};

/**
 * A helper-method that:
 *
 * 1. Creates a Contract.
 * 2. Adds the default PaySwarm Authority PayeeScheme to it.
 * 3. Finalizes the Contract.
 * 4. Checks the Payee amounts on the finalized Contract.
 *
 * @see createContract
 *
 * @param actor the Profile performing the action.
 * @param contract the contract to populate (with reference ID if applies).
 * @param options:
 *          listingId: the Listing ID (to look up Listing).
 *          listing: the full Listing (to use given Listing).
 *          listingHash: the Listing hash.
 *          asset: the Asset (optional, will be retrieved otherwise).
 *          license: the License (optional, will be retrieved otherwise).
 *          assetAcquirer: the Asset acquirer to use.
 *          acquirerAccountId: the Asset acquirer's Account ID.
 * @param callback(err, contract) called once the operation completes.
 */
api.createFinalizedContract = function(actor, contract, options, callback) {
  // FIXME: implement me
};

/**
 * Processes a signed Contract. License issuance, financial Transactions,
 * and any other business is handled. This method must only be called
 * after finalizeContract().
 *
 * The options include:
 *
 * A "duplicateQuery" that can be used prevent duplicate purchases
 * from occurring. The query is used to determine if the Contract would
 * result in a duplicate purchase and should therefore cause the Transaction
 * to abort. See hasContract for details on "duplicateQuery".
 *
 * @param actor the Profile performing the action.
 * @param contract the Contract to process.
 * @param options:
 *          duplicateQuery a query used to prevent duplicates.
 *          escrowType: the escrow type to use (EscrowNone or EscrowReceive).
 * @param callback(err) called once the operation completes.
 */
api.processContract = function(actor, contract, options, callback) {
  // FIXME: implement me
};

/**
 * Retrieves a Contract by its ID.
 *
 * @param actor the Profile performing the action.
 * @param id the ID of the Contract to retrieve.
 * @param callback(err, contract, meta) called once the operation completes.
 */
api.getContract = function(actor, id, callback) {
  // FIXME: implement me
};

/**
 * Retrieves a previously-cached Contract by its ID. When Contracts are
 * finalized, they are written to a temporary cache so that they can
 * be retrieved later for processing.
 *
 * @param actor the profile Performing the action.
 * @param id the ID of the Contract to retrieve.
 * @param callback(err, contract, meta) called once the operation completes.
 */
api.getCachedContract = function(actor, id, callback) {
  // FIXME: implement me
};

/**
 * Signs a contract.
 *
 * @param actor the Profile performing the action.
 * @param contract the Contract to sign.
 * @param callback(err) called once the operation completes.
 */
api.signContract = function(actor, contract, callback) {
  // FIXME: implement me
};

/**
 * Verifies a contract.
 *
 * @param contract the Contract to verify.
 * @param callback(err, verified) called once the operation completes.
 */
api.verifyContract = function(contract, callback) {
  // FIXME: implement me
};

/**
 * Checks to see if a Contract exists for the given query parameters.
 *
 * The query must contain:
 *
 * identityId - the ID of the Identity to look for.
 * identityKey - the hashed ID of the Identity (optional optimization).
 *
 * The query may contain either:
 *
 * assetId - the ID of the Asset to look for.
 * assetKey - the hashed ID of the Asset (optional optimization).
 * combos - an optional array of possible asset hash + license combinations:
 *   assetHash - optional hash of a more specific Asset.
 *   licenseId - an optional ID of the License to look for.
 *   licenseKey - the hashed ID of the License (optional optimization).
 *   licenseHash - optional hash of a more specific License.
 *
 * OR
 *
 * referenceId - an ID (opaque to payswarm) specified by the merchant. Each
 *   reference ID is unique to an Identity. This allows for purchases of the
 *   same Asset by the same Identity using different reference IDs.
 *
 * @param actor the Profile performing the action.
 * @param query the query to use.
 * @param callback(err, exists) called once the operation completes.
 */
api.hasContract = function(actor, query, callback) {
  // FIXME: implement me
};
