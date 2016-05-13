let config = {};

// For dev
if(!window.govready) {
  window.govready = {
    siteId: "57328aecd416bb5128431664"
  }
}

// Set cms
config.cms = window.govready.cms || 'drupal';

switch(config.cms) {
  // WP plugin
  case 'wordpress':
    if(process.env.NODE_ENV === 'development') {
      config.apiUrl = 'http://localhost:8080/wp-admin/admin-ajax.php?action=govready_proxy&endpoint=/sites/' + window.govready.siteId + '/';
      config.apiUrlNoSite = 'http://localhost:8080/wp-admin/admin-ajax.php?action=govready_proxy&endpoint=';
    } else {
      config.apiUrl = '/wp-admin/admin-ajax.php?action=govready_proxy&endpoint=/sites/' + window.govready.siteId + '/';
      config.apiUrlNoSite = '/wp-admin/admin-ajax.php?action=govready_proxy&endpoint=';
    }
    config.plugText = 'Plugin';
    config.cmsNice = 'Wordpress';
    break;

  // Drupal module
  case 'drupal':
    if(process.env.NODE_ENV === 'development') {
      config.apiUrl = 'http://localhost:80/govready/api?action=govready_proxy&endpoint=/sites/' + window.govready.siteId + '/';
      config.apiUrlNoSite = 'http://localhost:80/govready/api?action=govready_proxy&endpoint=';
    } else {
      config.apiUrl = '/govready/api?action=govready_proxy&endpoint=/sites/' + window.govready.siteId + '/';
      config.apiUrlNoSite = '/govready/api?action=govready_proxy&endpoint=';
    } 
    config.plugText = 'Module';
    config.cmsNice = 'Drupal';
    break;
}

export default config;