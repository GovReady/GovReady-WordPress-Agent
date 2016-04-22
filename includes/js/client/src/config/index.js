let config = {};

if(process.env.NODE_ENV === 'development') {
  config.apiUrl = 'http://localhost:8080/wp-admin/admin-ajax.php?action=govready_proxy&method=GET&endpoint=/sites/570d742fdb05ec6548965b75/';
} else {
  config.apiUrl = '/wp-admin/admin-ajax.php?action=govready_proxy&method=GET&endpoint=/sites/570d742fdb05ec6548965b75/';
}

export default config;