/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'userModel'
], function ($, _, Backbone, JST, User) {
  'use strict';

  var AuthCallbackView = Backbone.View.extend({
    template: JST['app/scripts/templates/auth_callback.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    events: {},

    initialize: function () {
      this.saveAuthToken();
    },

    render: function () {
    },

    saveAuthToken: function() {
      var urlParams = window.location.hash.match(/#\/auth\/callback\?(.*)/),
          urlParamsArray = urlParams[0].split('&'),
          splitViaRefreshCode = urlParams[1].split('&refresh_code='),
          refreshCode = splitViaRefreshCode[1],
          accessCode = splitViaRefreshCode[0].split('access_code=')[1];

      $.cookie('accessCode', accessCode);
      $.cookie('refreshCode', refreshCode);

      window.close();
    }
  });

  return AuthCallbackView;
});
