<?php
/*
Plugin Name:        GovReady (BETA)
Plugin URI:         http://govready.com/wordpress
Description:        GovReady provides a dashboard and tools to enhance security for government websites and achieve FISMA compliance.
Version:            1.0.0
Author:             GovReady
Author URI:         http://govready.com
License:            Affero GPL v3
*/

namespace Govready;


require_once plugin_dir_path(__FILE__) . 'lib/govready-agent.class.php';
require_once plugin_dir_path(__FILE__) . 'lib/govready-dashboard.class.php';

// Set the version of this plugin
//if( ! defined( 'GOVREADY_VERSION' ) ) {
//  define( 'GOVREADY_VERSION', '1.0' );
//} // end if


class Govready {

  public function __construct() {
    $this->key = 'govready';
    // @todo: get this from an API call?
    $this->auth0 = array(
      'domain' => 'govready.auth0.com',
      'client_id' => 'HbYZO5QXKfgNshjKlhZGizskiaJH9kGH'
    );
    $this->commercial = false; // Is this the commercial or open source version?
    $this->govready_client_url = 'https://plugin.govready.com';
    $this->govready_api_url = 'https://plugin.govready.com/v1.0';
    //$this->govready_api_url = 'http://localhost:4000/v1.0'; // NOTE: Docker can't see this!
    //$this->api_debug = true;

    // Load plugin textdomain
    //add_action( 'init', array( $this, 'plugin_textdomain' ) );

    // Add the AJAX proxy endpoints
    add_action( 'wp_ajax_govready_refresh_token', array($this, 'api_refresh_token') );
    add_action( 'wp_ajax_govready_proxy', array($this, 'api_proxy') );
    add_action( 'wp_ajax_nopriv_govready_proxy', array($this, 'api_proxy') );  // @todo: this is temp! only for testing!!!
  }

  /**
    * Defines the plugin textdomain.
    */
  /*public function plugin_textdomain() {

    $locale = apply_filters( $this->key, get_locale(), $domain );

    load_textdomain( $domain, WP_LANG_DIR . '/' . $domain . '/' . $domain . '-' . $locale . '.mo' );
    load_plugin_textdomain( $domain, FALSE, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );

  }*/ // end plugin_textdomain

  /**
   * Validates nonced requests
   */
  public function validate_token() {
    if (in_array($this->get_client_ip(), $this->govready_api_ips)) {
      return TRUE;
    }
    check_ajax_referer($this->key, 'govready_nonce');
  }

  /**
   * Helper function gets the client IP address
   */
  private function get_client_ip() {
    foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key) {
      if (array_key_exists($key, $_SERVER) === true) {
        foreach (array_map('trim', explode(',', $_SERVER[$key])) as $ip) {
          if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
            return $ip;
          }
        }
      }
    }
  }

  /**
   * Make a request to the GovReady API.
   * @todo: error handling
   */
  public function api( $endpoint, $method = 'GET', $data = array(), $anonymous = false ) {

    $url = $this->govready_api_url . $endpoint;

    // Make sure our token is a-ok
    $token = get_option( 'govready_token', array() );

    if ( !$anonymous && ( empty($token['id_token']) || empty($token['endoflife']) || $token['endoflife'] < time() ) ) {
      $token = $this->api_refresh_token( true );
    }
    $token = !$anonymous && !empty($token['id_token']) ? $token['id_token'] : false;

    // Make the API request with cURL
    // @todo should we support HTTP_request (https://pear.php.net/manual/en/package.http.http-request.intro.php)?
    $headers = array( 'Content-Type: application/json' );
    if ( $token ) {
      array_push( $headers, 'Authorization: Bearer ' . $token );
    }
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
    if ( $data ) {
      curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
    }
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($curl);
    curl_close($curl);
    
    // Only for debugging
    if ( !empty($this->api_debug) && $this->api_debug ) {
      print_r($method .' '. $url);
      print_r($data);
      print_r($response);
    }

    $response = json_decode( $response, true );

    // We need to save the siteId in the Drupal govready_options variable if this is a new site.
    if ($method == 'POST' && $endpoint == '/sites') {
      $options = get_option( 'govready_options' );
      $options['siteId'] = $response['_id'];
      update_option( 'govready_options', $options );
    }
    
    return $response;

  }


  /**
   * Refresh the access token.
   */
  public function api_refresh_token( $return = false ) {

    $this->validate_token();
    
    $options = get_option( 'govready_options' );
    if ( !empty( $_REQUEST['refresh_token'] ) ) {
      $token = $_REQUEST['refresh_token'];
      $options['refresh_token'] = $token;
      update_option( 'govready_options', $options );
    }
    else {
      $token = !empty($options['refresh_token']) ? $options['refresh_token'] : '';
    }

    $response = $this->api( '/refresh-token', 'POST', array( 'refresh_token' => $token), true );
    $response['endoflife'] = time() + (int) $response['expires_in'];
    update_option( 'govready_token', $response );

    if ($return) {
      return $response;
    }
    else {
      wp_send_json($response);
    }
  }


  /**
   * Call the GovReady API.
   */
  public function api_proxy() {

    $this->validate_token();

    $method = !empty($_REQUEST['method']) ? $_REQUEST['method'] : $_SERVER['REQUEST_METHOD'];
    $response = $this->api( $_REQUEST['endpoint'], $method, $_REQUEST );
    wp_send_json($response);
    wp_die();
  }


} // end class

new Govready;