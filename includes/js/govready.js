
(function($) {
  console.log(govready);
  // Example API query
  jQuery.get(
    ajaxurl, 
    {
      'action': 'govready_proxy',
      'endpoint': 'sites/' + govready.siteId
    }, 
    function(response){
      console.log('Data from the api', response);
    }
  );
})(jQuery);
