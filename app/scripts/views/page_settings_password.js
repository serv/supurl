/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var PageSettingsPasswordView = Backbone.View.extend({
    template: JST['app/scripts/templates/page_settings_password.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.settings-page',

    events: {},

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html(this.template());
    }
  });

  return PageSettingsPasswordView;
});
