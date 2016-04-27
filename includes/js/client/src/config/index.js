let config = {};

if(process.env.NODE_ENV === 'development') {
  config.apiUrl = 'http://localhost:8080/wp-admin/admin-ajax.php?action=govready_proxy&endpoint=/sites/' + window.govready.siteId + '/';
} else {
  config.apiUrl = '/wp-admin/admin-ajax.php?action=govready_proxy&endpoint=/sites/' + window.govready.siteId + '/';
}

export default config;