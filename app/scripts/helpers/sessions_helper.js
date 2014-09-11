define([
    'jquery',
    'common'
], function($, common) {
  var SessionsHelper = {
    isSignedIn: function() {
      var common = $.cookie('common'),
          commonParsed;

      if (common) {
        commonParsed = JSON.parse(common);

        if (commonParsed.currentUser) {
          return true;
        }
      } else {
        return false;
      }
    },

    signOut: function() {
      var keys = ['currentUser', 'accessCode', 'refreshCode'];

      if (this.isSignedIn()) {
        common = _.omit(common, function(value, key) {
          return _.contains(keys, key);
        });

        $.removeCookie('common');
        $.removeCookie('accessCode');
        $.removeCookie('refreshCode');
      } else {

        // Already signed out
        return true;
      }
    }
  };

  return SessionsHelper;
});
