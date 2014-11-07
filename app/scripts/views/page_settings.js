/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'pageSettingsAccountView',
  'pageSettingsPasswordView',
  'pageSettingsPreferencesView'
], function ($,
             _,
             Backbone,
             JST,
             PageSettingsAccountView,
             PageSettingsPasswordView,
             PageSettingsPreferencesView) {
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

      if (options.page) {
        if (options.page === 'account') {
          new PageSettingsAccountView();
        } else if (options.page === 'password') {
          new PageSettingsPasswordView();
        } else if (options.page === 'preferences') {
          new PageSettingsPreferencesView();
        }

        this.activateTab(options.page);
      }
    },

    activateTab: function(page) {
      var self = this,
          dom = '.e-tab-' + page,
          activeLi = 'ul.nav.nav-pills.nav-stacked li.active';

      this.$(activeLi).removeClass('active');
      this.$(dom).addClass('active');
    }
  });

  return PageSettingsView;
});
