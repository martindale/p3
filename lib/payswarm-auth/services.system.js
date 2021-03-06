/*
 * Copyright (c) 2012-2014 Digital Bazaar, Inc. All rights reserved.
 */

/*
 * WARNING: Do not let this run in production mode until authorization added.
 */

var bedrock = require('bedrock');
var payswarm = {
  logger: bedrock.module('loggers').get('app'),
  identity: bedrock.module('bedrock.identity'),
  validation: bedrock.module('validation')
};

// constants
var MODULE_NS = 'payswarm.services';

// module API
var api = {};
api.name = MODULE_NS + '.system';
api.namespace = MODULE_NS;
module.exports = api;

/**
 * Initializes this module.
 *
 * @param app the application to initialize this module for.
 * @param callback(err) called once the operation completes.
 */
api.init = function(app, callback) {
  payswarm.website = bedrock.module('bedrock.website');
  addServices(app, callback);
};

/**
 * Adds web services to the server.
 *
 * @param app the payswarm-auth application.
 * @param callback(err) called once the services have been added to the server.
 */
function addServices(app, callback) {
  var ensureAuthenticated = payswarm.website.ensureAuthenticated;

  app.server.get('/system/ping',
    function(req, res) {
      res.send('pong');
    });

  app.server.get('/system/dashboard', ensureAuthenticated,
    //validate({query: 'services.budget.getBudgetQuery'}),
    function(req, res, next) {
      // FIXME!!!
      /*
      if(req.user.identity !== authority) {
        return next(err);
      }
      */
      function ldjson() {
        res.json({});
      }
      res.format({
        'application/ld+json': ldjson,
        json: ldjson,
        html: function() {
          payswarm.website.getDefaultViewVars(req, function(err, vars) {
            if(err) {
              return next(err);
            }
            //vars.xxx = ...;
            //vars.clientData.xxx = ...;
            res.render('system/dashboard.html', vars);
          });
        }
      });
    });

  callback(null);
}
