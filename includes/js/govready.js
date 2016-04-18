
(function($) {
  // Example API query
  jQuery.get(
    ajaxurl, 
    {
      'action': 'govready_proxy',
      'endpoint': '/sites/' + govready.siteId
    }, 
    function(response){
      console.log('/sites/:siteId', response);
    }
  );


  jQuery.get(

    ajaxurl, 
    {
      'action': 'govready_proxy',
      'endpoint': '/sites/' + govready.siteId + '/plugins'
    }, 
    function(response){
      console.log('/sites/:siteId/plugins', response);
    }
  );


  jQuery.get(
    ajaxurl, 
    {
      'action': 'govready_proxy',
      'endpoint': '/sites/' + govready.siteId + '/accounts'
    }, 
    function(response){
      console.log('/sites/:siteId/accounts', response);
    }
  );


  jQuery.get(
    ajaxurl, 
    {
      'action': 'govready_proxy',
      'endpoint': '/sites/' + govready.siteId + '/stack'
    }, 
    function(response){
      console.log('/sites/:siteId/stack', response);
    }
  );
})(jQuery);
