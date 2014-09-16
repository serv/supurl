define([
    'jquery'
], function($) {
  var SessionsHelper = {
    isSignedIn: function() {
      return !_.isEmpty(window.common.currentUser.get('token').accessCode);
    },

    signOut: function() {
      var keys = ['currentUser'];

      if (this.isSignedIn()) {
        window.common = _.each(window.common, function(value, key) {
          if (key == 'currentUser') {
            value.set({
              token: {},
              email: '',
              username: '',
              id: ''
            });
          } else {
            value = null;
          }
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
