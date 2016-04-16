<?php
/**
 * @author GovReady
 */

namespace Govready\GovreadyAgent;

class GovreadyAgent  {


  function __construct() {
    add_action( 'wp_ajax_govready_v1_trigger', array($this, 'ping') );    
  }

  // Generic callback for ?action=govready_v1_trigger&key&callback&siteId
  public function ping() {
    $options = get_option( 'govready_options' );
    //$site = $options['siteId'];
    $key = $_POST['key'];
    if ( !empty($key) ) {
      $data = call_user_func( array($this, $key), $options['siteId'] );
      if (!empty($data)) {
        print_r($data);
      }
    }
  }


  // Callback for ?action=govready_v1_trigger&key=plugins
  private function plugins() {

    $out = array();
    $plugins = get_plugins();
    foreach ($plugins as $key => $plugin) {
      $plugins[$key]['Active'] = is_plugin_active($key);
      array_push( $out, array(
        'label' => $plugin['Name'],
        'namespace' => $key,
        'status' => is_plugin_active($key),
        'version' => $plugin['Version'],
      ) );
    }

    return array( 'plugins' => $out, 'forceDelete' => true );

  }


  // Callback for ?action=govready_v1_trigger&key=accounts
  private function accounts() {

    $out = array();
    $fields = array( 'ID', 'user_login', 'user_email', 'user_nicename', 'user_registered', 'user_status' );
    $users = get_users( array( 'fields' => $fields ) );

    foreach ($users as $key => $user) {
      array_push( $out, array(
        'userId' => $user['ID'],
        'username' => $user['user_login'],
        'email' => $user['user_email'],
        'name' => $user['user_nicename'],
        'created' => $user['user_registered'],
        'lastLogin' => null, // @todo
      ) );
    }

    return array( 'accounts' => $out, 'forceDelete' => true );

  }


  // Callback for ?action=govready_v1_trigger&key=stack
  private function stack() {

    $phpinfo = $this->phpinfo_array();

    $phpinfo['uname'] = php_uname( 's' ) .' '. php_uname( 'r' );
    $phpinfo['php'] = 'PHP ' . phpversion();

    global $wp_version;
    $phpinfo['application'] = 'WordPress ' . $wp_version;


    return $phpinfo;

  }


  // phpinfo() as an array.
  // From http://php.net/manual/en/function.phpinfo.php#87463
  private function phpinfo_array($return=false){
    /* Andale!  Andale!  Yee-Hah! */
    ob_start(); 
    phpinfo(-1);

    $pi = preg_replace(
    array('#^.*<body>(.*)</body>.*$#ms', '#<h2>PHP License</h2>.*$#ms',
    '#<h1>Configuration</h1>#',  "#\r?\n#", "#</(h1|h2|h3|tr)>#", '# +<#',
    "#[ \t]+#", '#&nbsp;#', '#  +#', '# class=".*?"#', '%&#039;%',
      '#<tr>(?:.*?)" src="(?:.*?)=(.*?)" alt="PHP Logo" /></a>'
      .'<h1>PHP Version (.*?)</h1>(?:\n+?)</td></tr>#',
      '#<h1><a href="(?:.*?)\?=(.*?)">PHP Credits</a></h1>#',
      '#<tr>(?:.*?)" src="(?:.*?)=(.*?)"(?:.*?)Zend Engine (.*?),(?:.*?)</tr>#',
      "# +#", '#<tr>#', '#</tr>#'),
    array('$1', '', '', '', '</$1>' . "\n", '<', ' ', ' ', ' ', '', ' ',
      '<h2>PHP Configuration</h2>'."\n".'<tr><td>PHP Version</td><td>$2</td></tr>'.
      "\n".'<tr><td>PHP Egg</td><td>$1</td></tr>',
      '<tr><td>PHP Credits Egg</td><td>$1</td></tr>',
      '<tr><td>Zend Engine</td><td>$2</td></tr>' . "\n" .
      '<tr><td>Zend Egg</td><td>$1</td></tr>', ' ', '%S%', '%E%'),
    ob_get_clean());

    $sections = explode('<h2>', strip_tags($pi, '<h2><th><td>'));
    unset($sections[0]);

    $pi = array();
    foreach($sections as $section){
       $n = substr($section, 0, strpos($section, '</h2>'));
       preg_match_all(
       '#%S%(?:<td>(.*?)</td>)?(?:<td>(.*?)</td>)?(?:<td>(.*?)</td>)?%E%#',
         $section, $askapache, PREG_SET_ORDER);
       foreach($askapache as $m)
           $pi[$n][$m[1]]=(!isset($m[3])||$m[2]==$m[3])?$m[2]:array_slice($m,2);
    }

    return ($return === false) ? print_r($pi) : $pi;
  }


}
new GovreadyAgent;
