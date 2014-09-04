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
      var windowHash = window.location.hash,
          urlParams = windowHash.match(/#\/auth\/callback\?token=(.*)/);

      debugger;
      $.removeCookie('authTokenSupurl');
      $.cookie('authTokenSupurl', urlParams[1]);
    }
  });

  return AuthCallbackView;
});
