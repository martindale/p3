/*!
 * PaySwarm Angular Filters
 *
 * @author Dave Longley
 */
(function() {

angular.module('payswarm.filters')
.filter('cardBrand', function() {
  return function(input, logo) {
    if(input === 'ccard:Visa') {
      return logo ? 'cc-logo-visa' : 'Visa';
    }
    if(input === 'ccard:MasterCard') {
      return logo ? 'cc-logo-mastercard' : 'MasterCard';
    }
    if(input === 'ccard:Discover') {
      return logo ? 'cc-logo-discover': 'Discover';
    }
    if(input === 'ccard:AmericanExpress') {
      return logo ? 'cc-logo-amex' : 'American Express';
    }
    if(input === 'ccard:ChinaUnionPay') {
      return logo ? 'cc-logo-china-up' : 'China Union Pay';
    }
  };
})
.filter('slug', function() {
  return function(input) {
    // replace spaces with dashes, make lower case and URI encode
    if(input === undefined || input.length === 0) {
      input = '';
    }
    return encodeURIComponent(
      input.replace(/\s+/g, '-').replace(/[^\w-]+/g, '').toLowerCase());
  };
})
.filter('ceil', function($filter) {
  return function(value, digits) {
    if(digits === undefined) {
      digits = 2;
    }
    return (Math.ceil(value * 100) / 100).toFixed(2);
  };
})
.filter('floor', function($filter) {
  return function(value, digits) {
    if(digits === undefined) {
      digits = 2;
    }
    return (Math.floor(value * 100) / 100).toFixed(2);
  };
});

})();
