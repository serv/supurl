/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'common',
  'userModel'
], function ($, _, Backbone, JST, common, User) {
  'use strict';

  var AuthCallbackView = Backbone.View.extend({
    template: JST['app/scripts/templates/auth_callback.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    events: {},

    initialize: function () {
      this.saveAuthToken();
      this.closePopUp();
    },

    render: function () {
    },

    closePopUp: function() {
      window.close();
    },

    saveAuthToken: function() {
      var urlParams = window.location.hash.match(/#\/auth\/callback\?(.*)/),
          urlParamsArray = urlParams[0].split('&'),
          splitViaRefreshCode = urlParams[1].split('&refresh_code='),
          refreshCode = splitViaRefreshCode[1],
          accessCode = splitViaRefreshCode[0].split('access_code=')[1];

      $.cookie('accessCode', accessCode);
      $.cookie('refreshCode', refreshCode);

      common.currentUser = new User();
      common.currentUser.set({
        token: {
          accessCode: accessCode,
          refreshCode: refreshCode
        }
      });

      $.cookie('common', JSON.stringify(common));
    }
  });

  return AuthCallbackView;
});
