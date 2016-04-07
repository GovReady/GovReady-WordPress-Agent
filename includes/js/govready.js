
(function($, Proud) {
  Proud.behaviors.proud_map_app = {
    attach: function(context, settings) {
      var instances = _.get(settings, 'proud_map_app.instances');
      // initialize instances
      if (instances) {
        $.each(instances, function(id, appVals) {
          var $app = $('#' + id);
          if(!$app.hasClass('ng-scope')) {
            angular.bootstrap($app, ['mapAppParent']);
          }
        });
      }
    }
  }
})(jQuery, Proud);
