/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'pageSettingsAccountView',
  'pageSettingsPasswordView'
], function ($,
             _,
             Backbone,
             JST,
             PageSettingsAccountView,
             PageSettingsPasswordView) {
  'use strict';

  var PageSettingsView = Backbone.View.extend({
    template: JST['app/scripts/templates/page_settings.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#main',

    events: {},

    initialize: function (options) {
      this.render();
      this.renderPartialViews(options);
    },

    render: function () {
      this.$el.html(this.template());
    },

    renderPartialViews: function(options) {
      if (options.page === 'account') {
        new PageSettingsAccountView();
      } else if (options.page === 'password') {
        new PageSettingsPasswordView();
      } else if (options.page === 'preferences') {

      }
    }
  });

  return PageSettingsView;
});
