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
          if (key === 'currentUser') {
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
    },

    currentUser: function() {
      if (window.common && window.common.currentUser) {
        return window.common.currentUser;
      }
    }(),

    sessionParam: function() {
      var currentUser = this.currentUser,
          sessionHash = {
            access_code: currentUser.get('token').accessCode,
            current_user: currentUser.get('email')
          };

      return sessionHash;
    },

    sessionParamUrl: function() {
      return JSON.stringify(this.sessionParam());
    },

    setAjaxHeader: function(options) {
      var accessCode = options.accessCode;

      $(document).ajaxSend(function(event, request, settings) {
         if (accessCode) {
            request.setRequestHeader("token", accessCode);
         }
      });
    }
  };

  return SessionsHelper;
});
