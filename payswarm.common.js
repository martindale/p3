/*
 * Copyright (c) 2012 Digital Bazaar, Inc. All rights reserved.
 */
// FIXME: use this or deprecate it?
var bigdecimal = require('bigdecimal');
var payswarm = {
  logger: require('./payswarm.logger')
};

var api = {
  money: require('./payswarm.money'),
  security: require('./payswarm.security'),
  tools: require('./payswarm.tools')
};
module.exports = api;
