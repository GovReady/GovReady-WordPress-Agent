let config = {};

// CMS specific
if(window.govready) {
  config = window.govready;
  config.cms = 'wordpress';
  config.pluginText = 'Plugin';
  config.cmsNice = 'Wordpress';
  let url = '/wp-admin/admin-ajax.php?';
  if(process.env.NODE_ENV === 'development') {
    url = 'http://localhost:8080/wp-admin/admin-ajax.php?';
  }
  config.apiUrl = url + 'action=govready_proxy&endpoint=/sites/' + config.siteId + '/';
  config.apiUrlNoSite = url + 'action=govready_proxy&endpoint=';
  config.apiTrigger = url + 'action=govready_v1_trigger';
  config.pluginUrl = 'https://wordpress.org/plugins/';
}
else if(window.Drupal && window.Drupal.settings.govready) {
  config = window.Drupal.settings.govready;
  config.cms = 'drupal';
  config.pluginText = 'Module';
  config.cmsNice = 'Drupal';
  let url = '/govready/api?';
  config.apiTrigger = '/govready/trigger';
  if(process.env.NODE_ENV === 'development') {
    url = 'http://alex-UX303UA:32771/govready/api?';
    config.apiTrigger = 'http://localhost:32771/govready/trigger';
  }
  config.apiUrl = url + 'action=govready_proxy&endpoint=/sites/' + config.siteId + '/';
  config.apiUrlNoSite = url + 'action=govready_proxy&endpoint=';
  config.pluginUrl = 'https://drupal.org/project/';
}
else {
  config = {};
}

// Date format
config.dateFormat = 'MMMM Do YYYY';

export default config;