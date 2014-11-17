/*global define*/

define([
  'underscore',
  'backbone',
  'common',
  'userModel'
], function (_, Backbone, Common, User) {
  'use strict';

  var SessionsHelper = Backbone.Model.extend({
  });

  SessionsHelper.isSignedIn = function() {
    var common = Common.getInstance();

    return !_.isEmpty(common.get('currentUser'))
        && !_.isEmpty(common.get('currentUser').get('token').accessCode);
  };

  SessionsHelper.signOut = function() {
    var common = Common.getInstance();

    common.set({'currentUser': new User()});
  };

  SessionsHelper.currentUser = function() {
    var common = Common.getInstance();

    if (!_.isEmpty(common.get('currentUser'))) {
      return common.get('currentUser');
    } else {
      return false;
    }
  };

  SessionsHelper.sessionParam = function() {
    var common = Common.getInstance();

    return {
      access_code: common.get('currentUser').get('token').accessCode,
      current_user: common.get('currentUser').get('email')
    };
  };

  SessionsHelper.sessionParamUrl = function() {
    return JSON.stringify(SessionsHelper.sessionParam());
  };

  SessionsHelper.setAjaxHeader = function(options) {
    var accessCode = options.accessCode;

    $(document).ajaxSend(function(event, request, settings) {
       if (accessCode) {
          request.setRequestHeader("token", accessCode);
       }
    });
  };

  SessionsHelper.setCurrentUser = function() {
    var currentUser = Common.getInstance().get('currentUser'),
        url = 'http://localhost:3000/api/v0/users/'
            + encodeURIComponent(currentUser.get('token').accessCode)
            + '/current_user_via_access_code';

    $.ajax({
      type : 'GET',
      url : url,
      dataType : 'json',
      success : function(data) {

        // TODO: use pubsub for this
        currentUser.set({
          id: data.id,
          username: data.username,
          email: data.email
        });
      }
    });
  };

  return SessionsHelper;

});
