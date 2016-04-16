/**
 * Add the Auth0 Lock plugin if the user has not set up their credentials.
 */
(function($) {
  var domain = govready_connect.auth0.domain;
  var clientID = govready_connect.auth0.client_id;
  var lock = new Auth0Lock(clientID, domain);
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
console.log(refresh_token);
    // Save the refresh token in WordPress
    jQuery.post(
      ajaxurl + '?action=govready_refresh_token', 
      {
        //'action': 'govready_refresh_token',
        'refresh_token': refresh_token,
        '_ajax_nonce': govready_connect.nonce
      }, 
      function(response){
        console.log(response);
        if (response.id_token != undefined) {
          location.reload();
        }
        else {
          // @todo
          alert('There was a problem creating your GovReady credentials. Please contact ops@govready.com for assistance.');
        }
      }
    );

  });

})(jQuery);
