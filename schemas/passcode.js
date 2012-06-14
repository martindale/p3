var tools = require('../lib/payswarm-auth/payswarm.tools');

var schema = {
  required: true,
  title: 'Passcode',
  description: 'An auto-generated security code.',
  type: 'string',
  minLength: 8,
  maxLength: 8,
  errors: {
    invalid: 'The passcode must be 8 characters in length.',
    missing: 'Please enter a passcode.'
  }
};

module.exports = function(extend) {
  if(extend) {
    return tools.extend(tools.clone(schema), extend);
  }
  return schema;
};
