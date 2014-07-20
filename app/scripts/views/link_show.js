/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'linkModel'
], function ($, _, Backbone, JST, Link) {
  'use strict';

  var LinkShowView = Backbone.View.extend({
    template: JST['app/scripts/templates/link_show.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#main',

    events: {},

    url: 'http://localhost:3000/api/v0/links',

    initialize: function (id) {
      this.model = new Link({id: 1});
      this.model.fetch();
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      // this.$el.html(this.template(this.model.toJSON()));
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

  return LinkShowView;
});
