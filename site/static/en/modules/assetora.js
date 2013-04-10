/*!
 * Assetora
 *
 * @author Dave Longley
 */
(function() {

var module = angular.module('payswarm');

module.controller('AssetoraCtrl', function(
  $scope, svcHostedAsset, svcHostedListing) {
  $scope.model = {};
  // FIXME: globalize window.data access
  var data = window.data || {};
  $scope.identity = data.identity;
  $scope.model.recentAssets = svcHostedAsset.recentAssets;
  $scope.model.recentListings = svcHostedListing.recentListings;
  $scope.state = {
    assets: svcHostedAsset.state,
    listings: svcHostedListing.state
  };
  $scope.model.search = {input: '', results: []};
  $scope.model.modals = {
    showEditAsset: false,
    showAddAsset: false,
    showEditListing: false,
    showAddListing: false
  };
  $scope.deleteAsset = function(asset) {
    $scope.showDeleteAssetAlert = true;
    $scope.assetToDelete = asset;
  };
  $scope.confirmDeleteAsset = function(err, result) {
    // FIXME: handle errors
    if(!err && result === 'ok') {
      var asset = $scope.assetToDelete;
      asset.deleted = true;

      // wait to delete so modal can transition
      $timeout(function() {
        svcAsset.del(asset.id, function(err) {
          if(err) {
            asset.deleted = false;
          }
        });
      }, 400);
    }
    $scope.assetToDelete = null;
  };
  $scope.deleteListing = function(listing) {
    $scope.showDeleteListingAlert = true;
    $scope.listingToDelete = listing;
  };
  $scope.confirmDeleteListing = function(err, result) {
    // FIXME: handle errors
    if(!err && result === 'ok') {
      var listing = $scope.listingToDelete;
      listing.deleted = true;

      // wait to delete so modal can transition
      $timeout(function() {
        svcListing.del(listing.id, function(err) {
          if(err) {
            listing.deleted = false;
          }
        });
      }, 400);
    }
    $scope.listingToDelete = null;
  };
  $scope.search = function(input, state, callback) {
    // FIXME: remove me
    console.log('search', input, state);

    // search listings for input as keywords
    svcHostedListing.get({
      storage: $scope.model.search.results,
      keywords: $scope.model.search.input
    }, function(err) {
      if(err) {
        state.error = err;
      }
      else {
        state.error = null;
      }
      callback();
    });
  };

  svcHostedAsset.getRecent({force: true});
  svcHostedListing.getRecent({force: true});
});

})();
