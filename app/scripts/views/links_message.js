/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var LinksMessageView = Backbone.View.extend({
    template: JST['app/scripts/templates/links_message.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: 'p-links-message',

    events: {},

    initialize: function (options) {
      // this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      // this.$el.html(this.template(this.model.toJSON()));
      this.$el.html(this.template());
    }
  });

  return LinksMessageView;
});
