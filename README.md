# GovReady
GovReady provides a dashboard and tools to enhance security for government websites and achieve FISMA compliance.

**Note: This plugin is currently under active development and should not be used on production websites.**

## Overview

The GovReady Agent monitors your WordPress site, domain, and ssl certificate to ensure that you are
following current security best-practices.

The GovReady Dashboard gives you a shared, easy-to-digest overview of the status of security on your
website, including:
* WordPress Core update status
* Contributed plugin update status, with vulnerability warnings from the [WPScan Vulnerability Database](wpvulndb.com)
* Superadmin accounts
* Site uptime monitoring
* The status of your domain and SSL certificate renewals
* A manual measures checklist to be completed periodically to ensure compliance
* A contact info matrix ("who do I contact to change my password", etc)
* Accounts that have not recently logged-in (and may have left your organization)
* Recent WordPress security news
* Recent important Internet security news (such as the recent [HeartBleed bug](http://heartbleed.com/))

`@todo` add screenshot(s)

## Requirements
* cURL must be installed and appear in `php.ini`. [Tutorial to enable cURL in PHP]
(http://www.tomjepson.co.uk/enabling-curl-in-php-php-ini-wamp-xamp-ubuntu/).


## Installation
**NOT RECOMMENDED FOR PRODUCTION - UNDER ACTIVE DEVELOPMENT**

This plugin code is under active development and has not been fully vetted for reliability or security.

That said, here is how to install the plugin and on say, your test blog.

1. Download a zipped version of this repo.
2. Open your WordPress blog in your browser.
3. Log into WP admin page and navigate to "Plugins."
4. Click "Add New."
5. Click "Upload Plugin."
6. Select the zipped version of this rep that you downloaded in step 1 and click "Install Now." (OS X automatically uncompresses a zipped file, so first compress the downloaded folder `GovReady-WordPress-Agent-master` to get `GovReady-WordPress-Agent-master.zip` to upload.)
7. Enter your FTP credentials if prompted.
8. Activate the plugin.
9. 

---

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


### Example calls to the API
