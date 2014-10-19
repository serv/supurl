/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'common',
  'sessionsHelper'
], function ($, _, Backbone, JST, common, SessionsHelper) {
  'use strict';

  var PageSettingsAccountView = Backbone.View.extend({
    template: JST['app/scripts/templates/page_settings_account.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.settings-page',

    events: {
      'click .e-settings-account-submit': 'onSubmit'
    },

    initialize: function () {
      this.render();
    },

    render: function () {
      var data = {};
      _.extend(data, SessionsHelper);
      this.$el.html(this.template(data));
    },

    onSubmit: function() {
      var email = $('.val-settings-account-email').val();
    }
  });

  return PageSettingsAccountView;
});
