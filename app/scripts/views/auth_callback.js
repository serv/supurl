/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
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
          accessCode = urlParams[0].split('access_code=')[1],
          refreshCode = urlParams[1].split('refresh_code=')[1];

      $.cookie('accessCode', accessCode);
      $.cookie('refreshCode', refreshCode);
    }
  });

  return AuthCallbackView;
});
