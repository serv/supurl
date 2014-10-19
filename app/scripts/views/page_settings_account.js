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

    events: {},

    initialize: function () {
      // this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      // this.$el.html(this.template(this.model.toJSON()));
      var data = {};
      _.extend(data, SessionsHelper);
      this.$el.html(this.template(data));
    }
  });

  return PageSettingsAccountView;
});
