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

    events: {
      'click .e-delete-link': 'onDelete'
    },

    initialize: function () {
      this.collection = new LinksCollection();
      this.listenTo( this.collection, 'reset add change remove', this.render, this );
      this.collection.fetch();
    },

    render: function () {
      this.$el.html(this.template(this.collection.toJSON()));
    },

    onDelete: function (e) {
      e.preventDefault();
      var id = $(e.currentTarget).data("id"),
          self = this,
          link = _.find(self.collection.models, function(l){
            return l.get('id') == id;
          });

      link.url = "http://localhost:3000/api/v0/links/" + id;

      link.destroy();
    }
  });

  return LinksView;
});
