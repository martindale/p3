${set([
  pageTitle = "Documentation"
])}
{{partial "site/head.tpl"}}

<div class="row">
  <div class="span10 offset1">
    <h1 class="headline">REST API Documentation</h1>
  </div>
</div>

<hr />

<div class="row">
  <div class="span10 offset1">
    <p>
This page contains RESTful API documentation for this PaySwarm Authority. If
you are a developer, this page will help you figure out what you need to send
to this system in order to register access keys, initiate transactions,
get transaction history, and perform a variety of other tasks in an automated
fashion. 
    </p>
  </div>
</div>

{{each(category, endpoints) docIndex}}
<div class="row">
  <div class="span10 offset1">
    <h2>${category}</h2>
  </div>
</div>
  {{each(topic, endpoint) endpoints}}
<div class="row">
  <div class="span8 offset2 rest-summary ${endpoint.method}-background">
    <span class="rest-verb ${endpoint.method}">${endpoint.method}</span>
    <a href="?topic=${topic}" class="rest-path">${endpoint.path}</a>
    <div class="rest-description">{{html endpoint.shortDescription}}</div>
  </div>
</div>
    
  {{/each}}
{{/each}}

{{partial "site/foot.tpl"}}