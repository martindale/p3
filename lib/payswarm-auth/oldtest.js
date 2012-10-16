/*
 * Copyright (c) 2012 Digital Bazaar, Inc. All rights reserved.
 */
var async = require('async');
var assert = require('assert');
var payswarm = {
  logger: require('./loggers').get('app'),
  money: require('./money'),
  security: require('./security'),
  tools: require('./tools')
};

var api = {};
module.exports = api;

api.name = 'payswarm.test';
api.init = function(app, callback) {
  // add resources to app server
  app.server.get('/', function(req, res) {
    res.send('hello world');
  });

  callback(null);

  /* Sign/Verify message test
  var privateKey = {
    privateKeyPem: '-----BEGIN RSA PRIVATE KEY-----\r\n' +
    'MIICWwIBAAKBgQC4R1AmYYyE47FMZgo708NhFU+t+VWn133PYGt/WYmD5BnKj679\r\n' +
    'YiUmyrC3hX6oZfo4eVpOkycxZvGgXCLQGuDp45XfZkdsjqs3o62En4YjlHWxgeGm\r\n' +
    'kiRqGfZ3sJ3u5WZ2xwapdZY3/2T/oOV5ri8SktTvmVGCyhwFuJC/NbJMEwIDAQAB\r\n' +
    'AoGAZXNdPMQXiFGSGm1S1P0QYzJIW48ZCP4p1TFP/RxeCK5bRJk1zWlq6qBMCb0E\r\n' +
    'rdD2oICupvN8cEYsYAxZXhhuGWZ60vggbqTTa+4LXB+SGCbKMX711ZoQHdY7rnaF\r\n' +
    'b/Udf4wTLD1yAslx1TrHkV56OfuJcEdWC7JWqyNXQoxedwECQQDZvcEmBT/Sol/S\r\n' +
    'AT5ZSsgXm6xCrEl4K26Vyw3M5UShRSlgk12gfqqSpdeP5Z7jdV/t5+vD89OJVfaa\r\n' +
    'Tw4h9BibAkEA2Khe03oYQzqP1V4YyV3QeC4yl5fCBr8HRyOMC4qHHKQqBp2VDUyu\r\n' +
    'RBJhTqqf1ErzUBkXseawNxtyuPmPrMSl6QJAQOgfu4W1EMT2a1OTkmqIWwE8yGMz\r\n' +
    'Q28u99gftQRjAO/s9az4K++WSUDGkU6RnpxOjEymKzNzy2ykpjsKq3RoIQJAA+XL\r\n' +
    'huxsYVE9Yy5FLeI1LORP3rBJOkvXeq0mCNMeKSK+6s2M7+dQP0NBYuPo6i3LAMbi\r\n' +
    'yT2IMAWbY76Bmi8TeQJAfdLJGwiDNIhTVYHxvDz79ANzgRAd1kPKPddJZ/w7Gfhm\r\n' +
    '8Mezti8HCizDxPb+H8HlJMSkfoHx1veWkdLaPWRFrA==\r\n' +
    '-----END RSA PRIVATE KEY-----'
  };
  var publicKey = {
    id: 'http://payswarm.dev/i/username/keys/1',
    publicKeyPem:
    '-----BEGIN PUBLIC KEY-----\r\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4R1AmYYyE47FMZgo708NhFU+t\r\n' +
    '+VWn133PYGt/WYmD5BnKj679YiUmyrC3hX6oZfo4eVpOkycxZvGgXCLQGuDp45Xf\r\n' +
    'Zkdsjqs3o62En4YjlHWxgeGmkiRqGfZ3sJ3u5WZ2xwapdZY3/2T/oOV5ri8SktTv\r\n' +
    'mVGCyhwFuJC/NbJMEwIDAQAB\r\n' +
    '-----END PUBLIC KEY-----'
  };

  var obj = {
    'foo': 'bar'
  };
  // FIXME: use callback
  payswarm.security.signJsonLd(obj, privateKey, publicKey.id);
  //console.log('SIGNED: ' + JSON.stringify(obj, null, 2));
  // FIXME: use callback
  assert(payswarm.security.verifyJsonLd(obj, publicKey));
  callback(null);*/

  /* Encrypt/Decrypt JSON-LD test
  var privateKey = {
    privateKeyPem: '-----BEGIN RSA PRIVATE KEY-----\r\n' +
    'MIICWwIBAAKBgQC4R1AmYYyE47FMZgo708NhFU+t+VWn133PYGt/WYmD5BnKj679\r\n' +
    'YiUmyrC3hX6oZfo4eVpOkycxZvGgXCLQGuDp45XfZkdsjqs3o62En4YjlHWxgeGm\r\n' +
    'kiRqGfZ3sJ3u5WZ2xwapdZY3/2T/oOV5ri8SktTvmVGCyhwFuJC/NbJMEwIDAQAB\r\n' +
    'AoGAZXNdPMQXiFGSGm1S1P0QYzJIW48ZCP4p1TFP/RxeCK5bRJk1zWlq6qBMCb0E\r\n' +
    'rdD2oICupvN8cEYsYAxZXhhuGWZ60vggbqTTa+4LXB+SGCbKMX711ZoQHdY7rnaF\r\n' +
    'b/Udf4wTLD1yAslx1TrHkV56OfuJcEdWC7JWqyNXQoxedwECQQDZvcEmBT/Sol/S\r\n' +
    'AT5ZSsgXm6xCrEl4K26Vyw3M5UShRSlgk12gfqqSpdeP5Z7jdV/t5+vD89OJVfaa\r\n' +
    'Tw4h9BibAkEA2Khe03oYQzqP1V4YyV3QeC4yl5fCBr8HRyOMC4qHHKQqBp2VDUyu\r\n' +
    'RBJhTqqf1ErzUBkXseawNxtyuPmPrMSl6QJAQOgfu4W1EMT2a1OTkmqIWwE8yGMz\r\n' +
    'Q28u99gftQRjAO/s9az4K++WSUDGkU6RnpxOjEymKzNzy2ykpjsKq3RoIQJAA+XL\r\n' +
    'huxsYVE9Yy5FLeI1LORP3rBJOkvXeq0mCNMeKSK+6s2M7+dQP0NBYuPo6i3LAMbi\r\n' +
    'yT2IMAWbY76Bmi8TeQJAfdLJGwiDNIhTVYHxvDz79ANzgRAd1kPKPddJZ/w7Gfhm\r\n' +
    '8Mezti8HCizDxPb+H8HlJMSkfoHx1veWkdLaPWRFrA==\r\n' +
    '-----END RSA PRIVATE KEY-----'
  };
  var publicKey = {
    id: 'http://payswarm.dev/i/username/keys/1',
    publicKeyPem:
    '-----BEGIN PUBLIC KEY-----\r\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4R1AmYYyE47FMZgo708NhFU+t\r\n' +
    '+VWn133PYGt/WYmD5BnKj679YiUmyrC3hX6oZfo4eVpOkycxZvGgXCLQGuDp45Xf\r\n' +
    'Zkdsjqs3o62En4YjlHWxgeGmkiRqGfZ3sJ3u5WZ2xwapdZY3/2T/oOV5ri8SktTv\r\n' +
    'mVGCyhwFuJC/NbJMEwIDAQAB\r\n' +
    '-----END PUBLIC KEY-----'
  };

  var obj = {
    'foo': 'bar'
  };
  async.waterfall([
    function encrypt(callback) {
      payswarm.security.encryptJsonLd(obj, publicKey, callback);
    },
    function decrypt(msg, callback) {
      payswarm.security.decryptJsonLd(msg, privateKey, callback);
    },
    function result(out, callback) {
      assert(JSON.stringify(obj) === JSON.stringify(out));
      callback(null);
    }
  ], callback(null));
  */

  /* Money test
  var d = new payswarm.money.Money(2);
  var x = new payswarm.money.Money("123456.123456789012345678901234567890");
  console.log("d * x = " + d.multiply(x));
  // Output: d * x = 7470299375046812977089832214047022056.555930270554343863089286012030

  var two = new payswarm.money.Money('2');
  console.log("Average = " + d.add(x).divide(two));
  // Output: Average = 30254875845269429306014707662291.561728394506172839450617283945

  //console.log("d / x (25 decimal places) = " + d.divide(x, 25));
  //callback(null);
  */
};