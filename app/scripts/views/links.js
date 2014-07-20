/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'links'
], function ($, _, Backbone, JST, LinksCollection) {
  'use strict';

  var LinksView = Backbone.View.extend({
    template: JST['app/scripts/templates/links.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#main',

    url: 'http://localhost:3000/api/v0/links',

    events: {},

    initialize: function () {
      this.collection = new LinksCollection();
      this.listenTo( this.collection, 'reset add change remove', this.render, this );
      this.collection.fetch();
    },

    render: function () {
      this.$el.html(this.template(this.collection.toJSON()));
    }
  });

  return LinksView;
});
