<?php
/*
Plugin Name:        GovReady
Plugin URI:         http://govready.com/wordpress
Description:        GovReady provides a dashboard and tools to enhance security for government websites and achieve FISMA compliance.
Version:            1.0.0
Author:             GovReady
Author URI:         http://govready.com
License:            Affero GPL v3
*/

namespace Govready;


// Set the version of this plugin
//if( ! defined( 'GOVREADY_VERSION' ) ) {
//  define( 'GOVREADY_VERSION', '1.0' );
//} // end if


class Govready {

  public function __construct() {
    $this->key = 'govready';
    $this->govready_url = 'http://localhost:4000/v1.0';

    // Load plugin textdomain
    add_action( 'init', array( $this, 'plugin_textdomain' ) );

    // Display the admin notification
    add_action( 'admin_notices', array( $this, 'plugin_activation' ) ) ;

    // Add the dashboard page
    add_action( 'admin_menu', array($this, 'create_menu') );

    // Add the AJAX proxy endpoints
    add_action( 'wp_ajax_govready_token', array($this, 'api_token') );
    add_action( 'wp_ajax_govready_proxy', array($this, 'api_proxy') );
    add_action( 'wp_ajax_govready_v1_trigger', array($this, 'api_agent') );
    
  }


  /**
    * Defines the plugin textdomain.
    */
  public function plugin_textdomain() {

    $locale = apply_filters( $this->key, get_locale(), $domain );

    load_textdomain( $domain, WP_LANG_DIR . '/' . $domain . '/' . $domain . '-' . $locale . '.mo' );
    load_plugin_textdomain( $domain, FALSE, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );

  } // end plugin_textdomain


  /**
   * Saves the version of the plugin to the database and displays an activation notice on where users
   * can connect to the GovReady API.
   */
  public function plugin_activation() {

    if( empty(get_option( 'govready_domain' )) ) {

      //add_option( 'govready_version', GOVREADY_VERSION ); @todo: this should be done only after connecting

      $html = '<div class="updated">';
        $html .= '<p>';
          $html .= __( '<a href="admin.php?page=govready">Connect to GovReady</a> to finish your setup and begin monitoring your site.', $this->key );
        $html .= '</p>';
      $html .= '</div><!-- /.updated -->';

      echo $html;

    } // end if

  } // end plugin_activation



  /**
   * Deletes the option from the database.
   */
  public static function plugin_deactivation() {

    delete_option( 'govready_domain' );

  } // end plugin_deactivation


  /**
   * Creates the wp-admin menu entries for the dashboard.
   */
  public function create_menu() {

    add_menu_page(
      __( 'GovReady', $this->key ), 
      __( 'GovReady', $this->key ), 
      'manage_options',
      'govready',
      array($this, 'dashboard_page'), 
      plugins_url('/images/icon.png', __FILE__) 
    );

  } // end create_menu


  /**
   * Display the GovReady dashboard.
   */
  public function dashboard_page() {
    
    if( empty(get_option( 'govready_settings' )) ) {
      
      require_once plugin_dir_path(__FILE__) . '/templates/govready-connect.php';
    
    }
    else {

      print 'This will be the dashboard';
      // @todo: call separate class?

    }

  }



  /**
   * Make a request to the GovReady API.
   */
  public function api( $endpoint, $method = 'GET', $data = array() ) {

    $url = $this->govready_url . $endpoint;
    $token = get_option( 'govready_token' );

    $ch = curl_init();
    curl_setopt( $ch, CURLOPT_URL, $url );
    curl_setopt( $ch, CURLOPT_CUSTOMREQUEST, $method );
    if ( !empty($data) ) {
      curl_setopt( $ch, CURLOPT_POSTFIELDS, http_build_query($data) );
    }
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
    if ( $token ) {
      curl_setopt( $ch, CURLOPT_HTTPHEADER, array( 'Bearer: ' . $token ) );
    }

    $response = curl_exec($ch);
    print_r($response);
    $response = json_decode($response);
    print_r($url);
        print_r($response);

    return $response;

  }


  // API Token callback
  public function api_token() {

    //require_once plugin_dir_path(__FILE__) . '/lib/govready-agent.class.php';

  }


  // API Proxy callback
  public function api_proxy() {

    $method = !empty($_REQUEST['method']) ? $_REQUEST['method'] : $_SERVER['REQUEST_METHOD'];
    $response = $this->api( $_REQUEST['endpoint'], $method, $_REQUEST );
    wp_send_json($response);
    wp_die();

  }


  // API Ping trigger callback
  public function api_agent() {

    require_once plugin_dir_path(__FILE__) . '/lib/govready-agent.class.php';

  }


} // end class

new Govready;