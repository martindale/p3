${set([
  pageTitle = "Hosted Assets",
  jsList.push("modules/hostedAssets")
])}
{{partial "head.tpl"}}

{{verbatim}}
<div data-ng-controller="HostedAssetsCtrl" class="ng-cloak">

<div data-ng-show="model.query.assetContent">

<h2 class="headline">Assets available for Purchase</h2>

<table class="table table-hover table-condensed"
  data-ng-show="model.loading || model.table.length > 0">
  <thead>
    <tr>
      <th class="date">Date</th>
      <th class="name">Title</th>
      <th class="name">Creator</th>
    </tr>
  </thead>
  <tbody>
    <tr data-ng-repeat="row in model.table"
      data-ng-hide="row.hidden"
      data-ng-click="row.type == 'asset' && showListings(row)">
      <!-- Date -->
      <td data-ng-switch="row.type">
        <span data-ng-switch-when="asset" class="date">{{row.asset.created | date:'medium'}}</span>
        <span data-ng-switch-when="listing" class="date">{{row.listing.psaPublished | date:'medium'}}</span>
      </td>
      <!-- Title -->
      <td data-ng-switch="row.type">
        <span data-ng-switch-when="asset" class="name">{{row.asset.title}}</span>
        <span data-ng-switch-when="listing"><a href="{{row.purchaseUrl}}">Buy {{row.title}} for <span class="money"
          data-tooltip-title="Since we support micro-payments, we track transaction amounts very accurately. The exact amount of this transaction is USD {{row.amount}}."
          data-placement="bottom" data-trigger="hover"><span class="currency">USD</span> {{row.amount | ceil | currency:'$'}}</span></a></span>
      </td>
      <td>
      </td>
      <!-- Creator -->
      <td>
        <span class="name">{{row.asset.creator.fullName}}</span>
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr data-ng-show="model.loading">
      <td colspan="3" style="text-align: center">
        <span class="center">
          <span data-spinner="model.loading" data-spinner-class="table-spinner"></span>
        </span>
      </td>
    </tr>
  </tfoot>
</table>
<div data-ng-show="!model.loading && model.table.length == 0">
  <p class="center">No matches.</p>
</div>

</div>

<div data-ng-hide="model.query.assetContent">
FIXME: Not implemented
</div>

{{/verbatim}}

{{partial "demo-warning.tpl"}}

{{partial "foot.tpl"}}
