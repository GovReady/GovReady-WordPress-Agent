/**
 * Add the Auth0 Lock plugin if the user has not set up their credentials.
 */
(function($) {
  var domain = govready_connect.auth0.domain;
  var clientID = govready_connect.auth0.client_id;
  var lock = new Auth0Lock(clientID, domain);


  // Show the Auth0 signin modal, and deal with the response
  lock.show({
    icon: 'https://avatars1.githubusercontent.com/u/6815262?v=3&s=200',
    container: 'widget-container',
    focusInput: false,
    popup: false,
    authParams: {
      scope: 'openid offline_access'
    },
    device: 'govready-wordpress-' + govready_connect.siteId
  }, function (err, profile, id_token, access_token, state, refresh_token) {
    if (err) {
      return;
    }
    
    // Save the refresh token in WordPress
    jQuery.post(
      ajaxurl + '?action=govready_refresh_token', 
      {
        //'action': 'govready_refresh_token',
        'refresh_token': refresh_token,
        '_ajax_nonce': govready_connect.nonce
      }, 
      function(response){
        if (response.id_token != undefined) {
          // Ladies and gentlemen, start your engines
          // $('#signup-content').hide();
          // $('#signup-loading').show();
          // initRemote(0);
          location.reload();
        }
        else {
          // @todo
          alert('There was a problem creating your GovReady credentials. Please contact ops@govready.com for assistance.');
        }
      }
    );

  });


  // // Initialize the site by pinging the GovReady servers
  // // Makes calls to admin.php?action=govready_proxy&endpoint=:endpoint, which
  // // calls the GovReady API.
  // var remoteSteps = [
  //   'ping',
  //   'domain',
  //   'plugins',
  //   'accounts',
  //   'stack'
  // ];
  // var initRemote = function( completed ) {
  //   if (completed >= remoteSteps.length) {
  //     location.reload();
  //   }
  //   else {
  //     jQuery.post(
  //       ajaxurl + '?action=govready_proxy&endpoint=/monitor/' + govready_connect.siteId + '/' + remoteSteps[completed], 
  //       {}, 
  //       function(response){
  //         // We're in local mode
  //         if (completed === 0 && response.indexOf('err') !== -1) {
  //           console.log('LOCAL');
  //           $('#signup-loading').hide();
  //           $('#local-mode').show();
  //         }
  //         else {
  //           completed ++;
  //           initRemote( completed );
  //         }
  //       }
  //     );
  //   }
  // }  // function


  // // Enable localhost mode
  // // We call the admin.php?action=govready_v1_trigger endpoints that the
  // // GovReady API calls
  // // @todo: make this work
  // var localSteps = [
  //   { key: 'activateLocal' },
  //   { key: 'plugins', endpoint: 'plugins' },
  //   { key: 'accounts', endpoint: 'accounts' },
  //   { key: 'stack', endpoint: 'stack' }
  // ];
  // var initLocal = function( completed ) {
  //   if (completed >= remoteSteps.length) {
  //     location.reload();
  //   }
  //   else {
  //     var data = localSteps[completed];
  //     data.siteId = govready_connect.siteId;
  //     data._ajax_nonce = govready_connect.nonce;

  //     $.ajax({
  //       "async": true,
  //       "url": ajaxurl + '?action=govready_v1_trigger',
  //       "method": "POST",
  //       //contentType: "application/x-form-urlencoded",
  //       "data": data,
  //       success: function(response) {
  //         completed ++;
  //         initLocal( completed );
  //       },
  //       error: function() {
  //         initLocal( completed );
  //       }
  //     });

  //   }
  // } // function
  // $('#local-mode-continue').bind('click', function(e) {
  //   e.preventDefault();
  //   initLocal(0);
  // });

})(jQuery);
