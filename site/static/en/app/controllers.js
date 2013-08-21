/*!
 * Controllers module.
 *
 * @author Dave Longley
 */
define([
  'angular',
  'app/controllers/account',
  'app/controllers/activity',
  'app/controllers/addressSettings',
  'app/controllers/assetora',
  'app/controllers/budget',
  'app/controllers/contentPortal',
  'app/controllers/createProfile',
  'app/controllers/dashboard',
  'app/controllers/externalAccountSettings',
  'app/controllers/hostedAssets',
  'app/controllers/key',
  'app/controllers/keySettings',
  'app/controllers/login',
  'app/controllers/navbar',
  'app/controllers/passcode',
  'app/controllers/purchase',
  'app/controllers/register',
  'app/controllers/tools'
], function(angular) {
  // register controllers and gather routes
  var module = angular.module('app.controllers', []);
  var controllers = Array.prototype.slice.call(arguments, 1);
  var routes = [];
  angular.forEach(controllers, function(controller) {
    if('controller' in controller || 'routes' in controller) {
      module.controller(controller.controller || {});
      routes.push.apply(routes, controller.routes || []);
    }
    else {
      module.controller(controller);
    }
  });

  // register routes
  module.config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
      angular.forEach(routes, function(route) {
        $routeProvider.when(route.path, route.options);
      });

      // route not known, redirect to simple path
      $routeProvider.otherwise({
        redirectTo: function(params, path, search) {
          // FIXME: needs work
          if(path !== window.location.pathname) {
            window.location.href = path;
          }
        }
      });
    }
  ]);
});
