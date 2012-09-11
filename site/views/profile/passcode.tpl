${set([
  pageTitle = "Reset Password",
  jsList.push("legacy/payswarm.api"),
  jsList.push("legacy/profile-passcode")
])}
{{partial "head.tpl"}}

<h2 class="headline">${pageTitle}</h2>

<div class="row">
  <div class="span6 offset3">
  
    <form id="request" class="form-horizontal ajax standard"
      method="post" action="/profile/passcode">
      <fieldset>
      <legend>Get Passcode</legend>
        <div class="control-group" data-binding="psaIdentifier">
          <label class="control-label" for="email">E-mail</label>
          <div class="controls">
            <input id="email" class="auto-tooltip" 
              name="profile" type="text" maxlength="320"
              value="{{if session.loaded}}${session.profile.email}{{/if}}" 
              data-original-title="The e-mail address that you used when you registered with this website."
              data-placement="right" data-trigger="focus" />
          </div>
        </div>
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Send Reset Instructions</button>
      </div>
      <div id="passcode-feedback"></div>
      </fieldset>
    </form>

  </div>
</div>

<div class="row">
  <div class="span6 offset3">
  
    <form id="reset" class="form-horizontal ajax standard"
      method="post" action="/profile/password">
      <fieldset>
      <legend>Update Your Password</legend>

      <div class="control-group">
        <label class="control-label" for="reset-email">E-mail</label>
        <div class="controls">
          <input id="reset-email" class="auto-tooltip" 
            name="input" type="text" maxlength="320"
            value="{{if session.loaded}}${session.profile.email}{{/if}}" 
            data-original-title="The e-mail address that you used above to retrieve reset instructions and a reset passcode."
            data-placement="right" data-trigger="focus" />
        </div>
      </div>
      
      <div class="control-group">
        <label class="control-label" for="passcode">Passcode</label>
        <div class="controls">
          <input id="passcode" class="auto-tooltip" 
            name="psa:passcode" type="text" maxlength="8"
            value="{{if psaPasscode}}${psaPasscode}{{/if}}" 
            data-original-title="The passcode that was sent to you in the password reset e-mail from this website."
            data-placement="right" data-trigger="focus" />
        </div>
      </div>
      
      <div class="control-group">
        <label class="control-label" for="new-password">New Password</label>
        <div class="controls">
          <input id="new-password" class="auto-tooltip"
            name="psa:passwordNew" type="password" maxlength="32" 
            data-original-title="The new password that you would like to use when accessing this website."
            data-placement="right" data-trigger="focus" />
        </div>
      </div>

      <div class="form-actions">
         <button class="btn btn-primary" type="submit">Set Password</button>
      </div>
      <div id="password-feedback" class="feedback"></div>
      </fieldset>
    </form>

  </div>
</div>

{{partial "foot.tpl"}}