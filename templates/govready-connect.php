<div class="container"><div class="col-xs-12">
  <h1 style="line-height: 65px;margin: 10px 0;">
    <img src="<?php print $logo ?>" style="height:50px;float:left;margin-right:10px;" alt="GovReady" />
    Welcome to GovReady <sup>BETA</sup>
  </h1>

  <div class="content">
    <div id="signup-content">
      <p>To get started, create a new GovReady account (or login with your existing account) and we'll connect your site to our monitoring API.</p>
      <!-- WIDGET -->
      <div id="widget-container" class="widget-container"></div>
      <p>By creating and connecting to an account, you are opting in to the GovReady Terms of Service (@todo: link to Terms of Service).  GovReady will contact your site periodically to collect information about your WordPress plugins, users and server information. Learn more (@todo: links to GitHub/README with information about the info we collect, etc).</p>
    </div>
    <div id="signup-loading" style="display:none">
      <h2><i class="fa fa-spinner fa-fw fa-spin"></i> Loading</h2>
      <p>We are collecting data about your site. It should only take a minute.  After we have collected your initial
      data, GovReady will automatically contact your site periodically to keep the data up-to-date. Learn more (@todo: links to GitHub/README with information about the info we collect, etc).</p>
    </div>
    <div id="local-mode" style="display:none">
      <h2>Oops</h2>
      <p>Our servers could not ping your site. This could be because you are on a local machine
      or behind a password wall.</p>
      <p>You can still use GovReady, however we will not be able to automatically refresh your
      information and some data (information about your domain name, etc) will not be available</p>
      <p><a href="#" id="local-mode-continue" class="btn btn-primary">Continue in Localhost mode &raquo;</a></p>
    </div>
  </div>

</div>



<style>
  html, body { padding: 0; margin: 0; }

  .content {
    padding: 25px 0px 25px 0px;
    width: 400px; /* login widget width is 280px */
  }

  .widget-container {
    margin-bottom: 20px;
    margin-top: 20px;
    min-height: 275px;
    margin-left: 50px;
  }

  .a0-zocial.a0-icon,
  .a0-zocial.a0-icon span {
    display: block !important;
  }

  .a0-zocial.a0-icon span {
    padding-left: 5% !important;
    width: 95% !important;
  }
</style>

<!--[if IE 8]>
<script src="//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js"></script>
<![endif]-->

<!--[if lte IE 9]>
<script src="https://cdn.auth0.com/js/base64.js"></script>
<script src="https://cdn.auth0.com/js/es5-shim.min.js"></script>
<![endif]-->

<script src="https://cdn.auth0.com/js/lock-9.1.min.js"></script>

<script>
  
</script>
