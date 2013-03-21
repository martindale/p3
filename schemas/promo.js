var tools = require(__libdir + '/payswarm-auth/tools');
var email = require('./email');
var w3cDateTime = require('./w3cDateTime');
var money = require('./money');

var schema = {
  required: true,
  title: 'Promotion',
  description: 'A promotion description.',
  type: 'object',
  properties: {
    promoCode: {
      title: 'Promotional Code',
      description: 'The promotional code.',
      required: true,
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errors: {
        invalid: 'The promo code is invalid.',
        missing: 'Please enter a promo code.'
      }
    },
    expires: w3cDateTime(),
    redeemable: {
      title: 'Redeemable',
      description: 'The number of times the promotional code can be redeemed.',
      required: true,
      type: 'integer',
      minimum: 1
    },
    deposit: {
      title: 'Promotional Deposits',
      description: 'The amounts and comments for deposits that occur when the promotional code is redeemed',
      required: true,
      type: 'array',
      items: {
        type: 'object',
        properties: {
          amount: money.precisePositive(),
          comment: {
            title: 'Deposit Comment',
            description: 'The comment that will appear in the deposit when the promotional code is redeemed.',
            required: false,
            type: 'string'
          }
        }
      }
    },
    email: email({required: false}),
    description: {
      title: 'Promotion Description',
      description: 'A description of the Promotion',
      required: false,
      type: 'string'
    }
  }
};

module.exports = function(extend) {
  if(extend) {
    return tools.extend(true, tools.clone(schema), extend);
  }
  return schema;
};
