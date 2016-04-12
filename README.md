# govready
GovReady provides a dashboard and tools to enhance security for government websites and achieve FISMA compliance.



## Developing

To delete the token and force re-authentication, run this wp-cli command:
```
wp option delete govready_options
```

### Making calls to the GovReady API
```javascript
http://localhost:8080/wp-admin/admin-ajax.php?action=govready_proxy&endpoint=/initialize&method=POST
```
```javascript
jQuery.get(
  ajaxurl, 
  {
    'action': 'govready_proxy',
    'endpoint': '/sites/' + govready.siteId
  }, 
  function(response){
    console.log('Data from the api', response);
  }
);
```