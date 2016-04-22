<?php
/**
 * @author GovReady
 */

namespace Govready\GovreadyDashboard;

use Govready;

class GovreadyDashboard extends Govready\Govready {


  function __construct() {
    parent::__construct();

    // Display the admin notification
    add_action( 'admin_notices', array( $this, 'plugin_activation' ) ) ;

    // Add the dashboard page
    add_action( 'admin_menu', array($this, 'create_menu') );
  }


  /**
   * Saves the version of the plugin to the database and displays an activation notice on where users
   * can connect to the GovReady API.
   */
  public function plugin_activation() {
    $options = get_option( 'govready_options', array() );
    if( empty($options['refresh_token']) ) {

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

    delete_option( 'govready_options' );
    delete_option( 'govready_token' );

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
    $options = get_option( 'govready_options', array() );
    $path = plugins_url('../includes/js/',__FILE__);

    // First time using app, need to set everything up
    if( empty($options['refresh_token']) ) {

      // Call GovReady /initialize to set the allowed CORS endpoint
      // @todo: error handling: redirect user to GovReady API dedicated login page
      if (empty($options['siteId'])) {
        $data = array(
          'url' => get_site_url(),
        );
        $response = $this->api( '/initialize', 'POST', $data, true );
        $options['siteId'] = $response['_id'];
        update_option( 'govready_options', $options );
      }

      // Save some JS variables (available at govready.siteId, etc)
      wp_enqueue_script( 'govready-connect', $path . 'govready-connect.js' );
      wp_localize_script( 'govready-connect', 'govready_connect', array( 
        'nonce' => wp_create_nonce( $this->key ),
        'auth0' => $this->auth0,
        'siteId' => $options['siteId']
      ) );

      require_once plugin_dir_path(__FILE__) . '../templates/govready-connect.php';
    
    }

    // Show me the dashboard!
    else {
    
      // Save some JS variables (available at govready.siteId, etc)
      wp_enqueue_script( 'govready-dashboard', $path . 'govready.js' );
      wp_localize_script( 'govready-dashboard', 'govready', array( 
        'siteId' => !is_null($options['siteId']) ? $options['siteId'] : null, 
        'nonce' => wp_create_nonce( $this->key )
      ) );

      // Enqueue react
      wp_enqueue_script( 'govready-dashboard-app-vendor', $path . 'client/dist/vendor.dist.js' );
      wp_enqueue_script( 'govready-dashboard-app', $path . 'client/dist/app.dist.js', array('govready-dashboard-app-vendor') );
      wp_enqueue_style ( 'govready-dashboard-app', $path . 'client/dist/app.dist.css' );


      require_once plugin_dir_path(__FILE__) . '../templates/govready-dashboard.php';

    } // if()

  }

}
new GovreadyDashboard;
