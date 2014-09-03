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
      this.closePopUp();
    },

    render: function () {
    },

    closePopUp: function() {
      window.close();
    }
  });

  return AuthCallbackView;
});
