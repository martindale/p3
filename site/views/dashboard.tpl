${set([
  pageTitle = "Identity Dashboard",
  jsList.push("common/scripts/tmpl.funcs.countries"),
  jsList.push("common/scripts/dashboard"),
  jsList.push("common/scripts/modals.add-account"),
  jsList.push("common/scripts/modals.add-address"),
  jsList.push("common/scripts/modals.add-budget"),
  jsList.push("common/scripts/modals.add-payment-token"),
  jsList.push("common/scripts/modals.deposit"),
  jsList.push("common/scripts/modals.edit-account"),
  jsList.push("common/scripts/modals.edit-budget"),
  inav = "dashboard"
])}  

{{partial "site/head.tpl"}}
{{partial "modals/add-account.tpl"}}
{{partial "modals/add-address.tpl"}}
{{partial "modals/add-budget.tpl"}}
{{partial "modals/add-payment-token.tpl"}}
{{partial "modals/deposit.tpl"}}
{{partial "modals/edit-account.tpl"}}
{{partial "modals/edit-budget.tpl"}}

{{verbatim}}
<div class="container ng-cloak" data-ng-app="dashboard"
  data-ng-controller="DashboardCtrl">

  <div class="row">
    <div class="span12">
      <h1 class="headline">Dashboard</h1>
      <h3 class="subheadline">Recent activity and status</h3>
      <hr />
    </div>
  </div>
    
  <div class="row">
    <div class="span6">
      <h3 class="headline">Accounts</h3>
      <table class="table table-condensed" data-ng-show="loading.accounts || accounts.length > 0">
        <thead>
          <tr>
            <th class="name">Account</th>
            <th class="money">Balance</th>
            <th class="action">Deposit</th>
            <th class="action">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr data-ng-repeat="account in accounts" class="account">
            <!-- Label -->
            <td>
              <a href="{{account.id}}?view=activity">{{account.label}}</a><span data-ng-show="account.psaStatus != 'active'" class="disabled">(Disabled)</span>
            </td>
            <!-- Balance -->
            <td class="money">
              <span data-original-title="Since we support micro-payments, we track your account balance very accurately. The exact amount in this account is {{account.currency}} {{account.balance | currency:'$'}}."
                data-placement="bottom" data-trigger="hover"><span class="currency">{{account.currency}}</span> {{account.balance | currency:'$'}}</span>
            </td>
            <!-- Deposit -->
            <td class="action">
              <button class="btn deposit" data-toggle="modal" title="Deposit" data-ng-click="deposit(account)"><i class="icon-plus"></i></button>
            </td>
            <!-- Edit -->
            <td class="action">
              <button class="btn edit" data-toggle="modal" title="Edit" data-ng-click="editAccount(account)"><i class="icon-pencil"></i></button>
            </td>
          </tr>
        </tbody>
        <tfoot data-ng-show="loading.accounts">
          <tr>
            <td colspan="4" style="text-align: center">
              <span class="center">
                <span data-spinner="loading.accounts" data-spinner-class="table-spinner"></span>
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
      <div data-ng-show="!loading.accounts && accounts.length == 0">
        <hr />
        <p class="center">You have no accounts configured for this identity.</p>
      </div>
      <button id="button-add-account" data-ng-hide="loading.accounts" class="btn btn-success" data-ng-click="addAccount()"><i class="icon-plus icon-white"></i> Add Account</button>
    </div>
    
    <div class="span6">
      <h3 class="headline">Budgets</h3>
      <table class="table table-condensed" data-ng-show="loading.budgets || budgets.length > 0">
        <thead>
          <tr>
            <th class="name">Budget</th>
            <th class="money">Balance</th>
            <th>Refresh</th>
            <th class="action">Edit</th>
            <th class="action">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr data-ng-repeat="budget in budgets" class="budget" data-fadeout="budget.deleted">
            <!-- Label -->
            <td class="name">
              <span title="{{budget.id}}">{{budget.label}}</span>
            </td>
            <!-- Balance -->
            <td class="money">
              <div class="progress progress-striped no-margin" data-progress-divisor="budget.balance" data-progress-dividend="budget.amount">
                <div class="bar" data-bar-divisor="budget.balance" data-bar-dividend="budget.amount"></div>
              </div>
              <span title="{{account.currency}} {{budget.balance | currency:'$'}}"><span class="currency">{{account.currency}}</span> {{budget.balance | currency:'$'}}</span> /
              <span title="{{account.currency}} {{budget.amount | currency:'$'}}"><span class="currency">{{account.currency}}</span> {{budget.amount | currency:'$'}}</span>
            </td>
            <!-- Refresh -->
            <td data-ng-switch="budget.psaRefresh">
              <span data-ng-switch-when="psa:Hourly">Hourly</span>
              <span data-ng-switch-when="psa:Daily">Daily</span>
              <span data-ng-switch-when="psa:Monthly">Monthly</span>
              <span data-ng-switch-when="psa:Yearly">Yearly</span>
            </td>
            <!-- Edit -->
            <td class="action">
              <button class="btn edit" data-toggle="modal" title="Edit" data-ng-click="editBudget(budget)"><i class="icon-pencil"></i></button>
            </td>
            <!-- Delete -->
            <td class="action">
              <button class="btn btn-danger" title="Delete" data-ng-click="deleteBudget(budget)"><i class="icon-remove icon-white"></i></button>
            </td>
          </tr>
        </tbody>
        <tfoot data-ng-show="loading.budgets">
          <tr>
            <td colspan="5" style="text-align: center">
              <span class="center">
                <span data-spinner="loading.budgets" data-spinner-class="table-spinner"></span>
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
      <div data-ng-show="!loading.budgets && budgets.length == 0">
        <hr />
        <p class="center">You have no budgets configured for this identity.</p>
      </div>
      <button id="button-add-budget" data-ng-hide="loading.budgets" class="btn btn-success" data-ng-click="addBudget()"><i class="icon-plus icon-white"></i> Add Budget</button>
    </div>
  </div>
</div>
{{/verbatim}}

{{! mode warning }}
{{if productionMode == false}}
<hr />
<div class="alert alert-info">
  <strong>NOTE:</strong> This is a demonstration website that does not use real money. Please do not enter any sensitive personal information. [<a href="http://payswarm.com/wiki/Demo_Warning">more info...</a>]
</div>
{{/if}}

{{partial "site/foot.tpl"}}
