/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
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
      this.$el.html(this.template());
    }
  });

  return PageSettingsAccountView;
});
