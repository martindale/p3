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

// module permissions
var PERMISSIONS = {
  BUDGET_ADMIN: MODULE_IRI + '#budget_admin',
  BUDGET_ACCESS: MODULE_IRI + '#budget_access',
  BUDGET_CREATE: MODULE_IRI + '#budget_create',
  BUDGET_EDIT: MODULE_IRI + '#budget_edit',
  BUDGET_REMOVE: MODULE_IRI + '#budget_remove'
};

// sub module API
var api = {};
module.exports = api;

/**
 * Initializes this module.
 *
 * @param callback(err) called once the operation completes.
 */
api.init = function(callback) {
  // do initialization work
  async.waterfall([
    function openCollections(callback) {
      // open all necessary collections
      payswarm.db.openCollections(['paymentToken'], callback);
    },
    function setupCollections(callback) {
      // setup collections (create indexes, etc)
      payswarm.db.createIndexes([{
        collection: 'budget',
        fields: {id: 1},
        options: {unique: true, background: true}
      }], callback);
    },
    _registerPermissions
  ], callback);
};

/**
 * Creates a Budget ID from the given Identity ID and budget slug.
 *
 * @param ownerId the Identity ID.
 * @param name the short budget name (slug).
 *
 * @return the Budget ID.
 */
api.createBudgetId = function(ownerId, name) {
  return util.format('%s/budgets/%s', ownerId, encodeURIComponent(name));
};

/**
 * Creates a new BudgetId based on the owner's IdentityId.
 *
 * @param ownerId the ID of the Identity budget owner.
 * @param budgetId the BudgetId generated for the Budget.
 *
 * @return true on success, false on failure with exception set.
 */
virtual bool generateBudgetId(
   payswarm::common::IdentityId ownerId,
   payswarm::common::BudgetId& budgetId) = 0;

/**
 * Creates a new Budget. The "@id", "@type", "ps:owner", and
 * "com:amount" properties must be set.
 *
 * @param actor the profile performing the action.
 * @param budget the new Budget to create.
 *
 * @return true on success, false on failure with exception set.
 */
virtual bool createBudget(
   payswarm::common::Profile& actor,
   payswarm::common::Budget& budget) = 0;

/**
 * Updates an existing Budget. Use this method to change the Budget
 * parameters, do not use it to change the Budget's remaining balance or
 * its applicable vendors. Other than @id only updated fields need to
 * be included.
 *
 * @param actor the profile performing the action.
 * @param budgetUpdate the budget @id and fields to update.
 *
 * @return true on success, false on failure with exception set.
 */
virtual bool updateBudget(
   payswarm::common::Profile& actor,
   payswarm::common::Budget& budgetUpdate) = 0;

/**
 * Deletes a Budget based on its ID.
 *
 * @param actor the profile performing the action.
 * @param budgetId the ID of the budget to delete.
 *
 * @return true on success, false on failure with exception set.
 */
virtual bool removeBudget(
   payswarm::common::Profile& actor,
   payswarm::common::BudgetId budgetId) = 0;

/**
 * Updates the remaining balance on the given Budget.
 *
 * @param actor the profile performing the action.
 * @param budget the budget to update.
 * @param amount the amount to change the Budget balance by (+/-).
 *
 * @return true on success, false on failure with exception set.
 */
virtual bool updateBudgetBalance(
   payswarm::common::Profile& actor,
   payswarm::common::Budget& budget,
   payswarm::common::Money& amount) = 0;

/**
 * Adds a vendor to a Budget.
 *
 * @param actor the profile performing the action.
 * @param budgetId the ID of the budget.
 * @param vendorId the ID of the vendor to add.
 *
 * @return true on success, false on failure with exception set.
 */
virtual bool addBudgetVendor(
   payswarm::common::Profile& actor,
   payswarm::common::BudgetId budgetId,
   payswarm::common::IdentityId vendorId) = 0;

/**
 * Removes a vendor from a Budget.
 *
 * @param actor the profile performing the action.
 * @param budgetId the ID of the budget.
 * @param vendorId the ID of the vendor to remove.
 *
 * @return true on success, false on failure with exception set.
 */
virtual bool removeBudgetVendor(
   payswarm::common::Profile& actor,
   payswarm::common::BudgetId budgetId,
   payswarm::common::IdentityId vendorId) = 0;

/**
 * Populates Budgets based on the given query. The query may contain
 * "budget" or "identity" (and "vendor" optionally along with "identity"),
 * where these fields refer to the ID of a specific budget, the ID of an
 * identity, and the ID of a vendor, respectively.
 *
 * @param actor the profile performing the action.
 * @param query the query to use.
 * @param result the result set with Budgets.
 * @param meta to store the meta data for the Budgets.
 *
 * @return true on success, false on failure with exception set.
 */
virtual bool populateBudgets(
   payswarm::common::Profile& actor,
   payswarm::common::DatabaseQuery& query,
   payswarm::common::ResourceSet& result,
   monarch::rt::DynamicObject* meta = NULL) = 0;

/**
 * Checks if an actor owns a Budget.
 *
 * @param actor the actor to compare against.
 * @param budget the Budget to compare.
 * @param callback(err, owns) called once the operation completes.
 */
function _checkBudgetOwner(actor, budget, callback) {
  async.waterfall([
    function(callback) {
      if('ps:owner' in budget) {
        callback(null, budget);
      }
      else {
        api.getBudget(actor, budget['@id'], function(err, budget) {
          callback(err, budget);
        });
      }
    },
    function(budget, callback) {
      payswarm.identity.checkIdentityObjectOwner(actor, budget, callback);
    }
  ], callback);
}

/**
 * Registers the permissions for this module.
 *
 * @param callback(err) called once the operation completes.
 */
function _registerPermissions(callback) {
  var permissions = [{
    '@id': PERMISSIONS.BUDGET_ADMIN,
    'psa:module': MODULE_IRI,
    'rdfs:label': 'Budget Administration',
    'rdfs:comment': 'Required to administer Budgets.'
  }, {
    '@id': PERMISSIONS.BUDGET_ACCESS,
    'psa:module': MODULE_IRI,
    'rdfs:label': 'Access Budget',
    'rdfs:comment': 'Required to access a Budget.'
  }, {
    '@id': PERMISSIONS.BUDGET_CREATE,
    'psa:module': MODULE_IRI,
    'rdfs:label': 'Create Budget',
    'rdfs:comment': 'Required to create a Budget.'
  }, {
    '@id': PERMISSIONS.BUDGET_EDIT,
    'psa:module': MODULE_IRI,
    'rdfs:label': 'Edit Budget',
    'rdfs:comment': 'Required to edit a Budget.'
  }, {
    '@id': PERMISSIONS.BUDGET_REMOVE,
    'psa:module': MODULE_IRI,
    'rdfs:label': 'Remove Budget',
    'rdfs:comment': 'Required to remove a Budget.'
  }];
  async.forEach(permissions, function(p, callback) {
    payswarm.permission.registerPermission(p, callback);
  }, callback);
}
