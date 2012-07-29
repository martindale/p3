${set([
  category = "Budgets",
  freeLimit = ["by-user"],
  authentication = ["signature"],
  validation = null,
  shortDescription = "Removes an existing budget from the system.",  
  cssList.push("index")
])}
{{partial "site/head.tpl"}}

<h1 class="row">
  <div class="span12 rest-summary">
    <span class="rest-verb ${method}">${method}</span>
    <span class="rest-path">${path}</span>
  </div>
</h1>

<hr />

<table>
 <tr><td>Topic</td><td>Budgets</td></tr>
 <tr><td>Rate Limit</td><td>${freeLimit[0]}</td></tr>
 <tr><td>Authentication</td><td>${authentication[0]}</td></tr>
</table>

<div class="row">
  <div class="span10 offset1">
    <p>
{{html shortDescription}}
    </p>
  </div>
</div>

{{partial "site/foot.tpl"}}