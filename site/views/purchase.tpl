${set([
  pageTitle = "Payment",
  jsList.push("modules/purchase"),
  pageLayout = "minimal"
])}
{{partial "head.tpl"}}

{{verbatim}}
<div class="container" data-ng-controller="PurchaseCtrl" class="ng-cloak">

<div data-ng-show="alertType">
  <div class="row">
    <div class="span6 offset3">
      <div data-ng-show="alertType == 'purchased'" class="alert alert-block alert-success">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <h4>Congratulations!</h4>
        <br/>
        <p>Your purchase is complete.
        <span data-ng-show="budget">
        The purchase was made using your budget "<strong>{{budget.label}}</strong>",
        which has a remaining balance of <span class="money"
          data-tooltip-title="Since we support micro-payments, we track transaction amounts very accurately. The exact amount of this transaction is USD {{budget.balance}}."
          data-placement="bottom" data-trigger="hover"><span
          class="currency">USD</span> {{budget.balance | floor | currency:'$'}}</span>.
        </span>
        </p>
      </div>
      <div data-ng-show="alertType == 'budgetExceeded'" class="alert alert-block alert-error">
        <button type="button" class="close" data-dismiss="alert">×</button>

        <h4>Budget Exceeded</h4>
        <p>Your purchase request exceeded the limitations of budget
        "<a href="{{selection.budget.id}}" target="_blank">{{selection.budget.label}}</a>"
        associated with this vendor. You may attempt the purchase again.</p>
        <ul>
          <li>Use a one-time payment from the budget's associated account if it has enough funds.</li>
          <li>Deposit enough funds for the purchase.</li>
          <li>Use another account with enough funds.</li>
          <li>Associate this this vendor with another budget or a new budget.</p>
        </ul>
      </div>
      <div data-ng-show="alertType == 'duplicatePurchase'" class="alert alert-block alert-success">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <h4>Duplicate Purchase</h4>
        <p>Our records indicate that you have already bought the item below.
        You have not been charged.</p>
      </div>
    </div>
  </div>
</div>

<div data-ng-hide="error">

  <div data-ng-show="loading || !ready" class="row">
    <div class="span6 offset3">
      <div class="alert alert-info">Loading purchase details...
        <div data-spinner="loading || !ready"
          data-spinner-class="alert-spinner"></div>
      </div>
    </div>
  </div>

  <div data-ng-hide="loading || !ready || purchased">
    <div class="row">
      <div class="span6 offset3">
        <h3>Do you want to make this purchase?</h3>
      </div>
    </div>
  </div>

  <div data-ng-hide="loading || !ready">
    <div class="row">
      <div class="section span6 offset3">
        <h4 class="headline">Purchase Details</h4>
        <table class="table">
          <thead>
            <tr>
              <th>Item</th>
              <th class="money">Price</th>
              <th class="action">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="{{contract.asset.assetContent}}" target="_blank">{{contract.asset.title}}</a></td>
              <td class="money"><span class="money"
                data-tooltip-title="Since we support micro-payments, we track transaction amounts very accurately. The exact amount of this transaction is USD {{contract.amount}}."
                data-placement="bottom" data-trigger="hover"><span
                class="currency">USD</span> {{contract.amount | ceil | currency:'$'}}</span></td>
              <td class="action"><button class="btn" data-ng-click="showDetails=!showDetails"><i class="icon-list-alt" title="Details"></i></button></td>
            </tr>
            <tr data-ng-show="showDetails">
              <th>Cost breakdown</th>
              <th></th>
              <th></th>
            </tr>
            <tr data-ng-show="showDetails" data-ng-repeat="transfer in contract.transfer">
              <td>{{transfer.comment}}</td>
              <td class="money"><span class="money right"
                data-tooltip-title="Since we support micro-payments, we track transaction amounts very accurately. The exact amount of this transfer is USD {{transfer.amount}}."
                data-placement="bottom" data-trigger="hover"><span
                class="currency">USD</span> {{transfer.amount | ceil | currency:'$'}}</span></td>
              <td><a href="{{transfer.destination}}" target="_blank">Destination</a></td>
            </tr>
            <tr data-ng-show="showDetails">
              <th>License Agreement</th>
              <th></th>
              <th></th>
            </tr>
            <tr body data-ng-show="showDetails">
              <td colspan="3"><pre class="license">{{contract.license.licenseTemplate}}</pre></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row">
      <div class="section span6 offset3">
        <h4 class="headline">{{(contract.vendor.id == contract.assetProvider.id && 'Vendor and Asset Provider') || 'Vendor'}}</h4>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="{{contract.vendor.id}}" target="_blank">{{contract.vendor.label}}</a></td>
              <td>{{contract.vendor.description}}</td>
              <td><a href="{{contract.vendor.website}}" target="_blank"><i class="icon-globe" title="Details"></i> {{contract.vendor.website}}</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="row" data-ng-show="{{contract.vendor.id != contract.assetProvider.id}})">
      <div class="section span6 offset3">
        <h4 class="headline">Asset Provider</h4>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="{{contract.assetProvider.id}}" target="_blank">{{contract.assetProvider.label}}</a></td>
              <td>{{contract.assetProvider.description}}</td>
              <td><a href="{{contract.assetProvider.website}}" target="_blank"><i class="icon-globe" title="Details"></i> {{contract.assetProvider.website}}</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div data-ng-hide="purchased" class="row">
      <div class="section span6 offset3">
        <h4 class="headline">Payment</h4>
        <form action="">
          <fieldset>
            <div class="control-group">
              <div class="controls payment-radio-group">
                <label class="radio">
                  <input type="radio" name="source-type"
                    data-ng-model="sourceType" value="account" />
                  Make one-time payment.
                  <span class="help-block">
                    Make a payment from an account. Funds can be deposited
                    if needed.
                  </span>
                </label>
                <label data-ng-show="contract.vendor.type == 'VendorIdentity'"
                  class="radio">
                  <input type="radio" name="source-type"
                    data-ng-model="sourceType" value="budget" />
                  Set up a budget for this vendor.
                  <div class="help-block">
                    Assigning a budget will cause future purchases with this
                    vendor to happen <strong>automatically</strong> if the
                    purchase amount is within the budget spending limitations.
                    <div data-ng-show="sourceType == 'budget'"
                      class="alert alert-warning">
                      <strong>Warning:</strong>
                      Only choose this option if you trust the vendor you are
                      purchasing from. This option will enable them to make
                      purchases on your behalf at their own discretion. Do not
                      choose this option if the vendor's website is not
                      secure.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>

    <div data-ng-hide="purchased" class="row">
      <div class="section span6 offset3">
        <div data-ng-show="sourceType == 'account'">
          <h4 class="headline">Account</h4>
          <div data-account-selector
            data-selected="selection.account"
            data-invalid="selection.invalidAccount"
            data-show-deposit-button="true"
            data-instant="true"
            data-min-balance="{{contract.amount}}"></div>
        </div>
        <div data-ng-show="sourceType == 'budget'">
          <h4 class="headline">Budget</h4>
          <div data-budget-selector
            data-selected="selection.budget"
            data-invalid="selection.invalidBudget"
            data-min-balance="{{contract.amount}}"></div>
        </div>
      </div>
    </div>

    <div data-ng-hide="purchased" class="row">
      <div class="span6 offset3">
        <hr />
        <div class="well center">
          <button class="btn btn-primary" data-ng-click="purchase()"
            data-ng-disabled="purchaseDisabled">Purchase</button>
          <!-- button class="btn">Cancel</button -->
        </div>
      </div>
    </div>

    <div data-ng-show="purchased" class="row">
      <div data-ng-show="callback" class="span6 offset3">
        <div class="alert alert-success">
          Click the button below to return to the vendor's website and view
          the item you purchased.
        </div>
        <form method="post" action="{{callback}}">
          <fieldset>
            <input
              name="encrypted-message" value="{{encryptedMessage | json}}"
              type="hidden" />
          </fieldset>
          <div class="well center">
            <button class="btn btn-primary">Return to Vendor's Website</button>
          </div>
        </form>
      </div>
      <div data-ng-hide="callback" class="span6 offset3">
        <div class="alert alert-success">
          Return to the vendor's website to view the item you purchased.
        </div>
      </div>
    </div>

  </div>

</div> <!-- end non-error -->

<div data-ng-show="error" class="alert alert-error">
  <em>Error</em>
  <br/>
  {{error.message}}
  <div data-ng-show="error.details" class="container">
    <br/>
    <em>Error Details</em>
    <div class="row" data-ng-repeat="(key, detail) in error.details">
      <span class="span12"><strong>{{key}}</strong>: {{detail}}</span>
    </div>
  </div>
</div> <!-- end error -->

<div data-modal-add-address="showAddAddressModal"
  data-identity="identity"
  data-modal-add-address-alert="Before you complete your purchase, please enter your {{(identity.type == 'VendorIdentity' && 'business\'s ') || ''}}name and address information."
  data-modal-on-close="addAddressModalDone()"></div>
<div data-modal-add-account="showAddAccountModal"
  data-modal-add-account-alert="purchase"
  data-modal-on-close="addAccountModalDone()"></div>

</div> <!-- end container -->
{{/verbatim}}
{{partial "foot.tpl"}}
