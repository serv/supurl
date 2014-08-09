/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'links',
  'tags'
], function ($,
             _,
             Backbone,
             JST,
             LinksCollection,
             TagsCollection) {
  'use strict';

  var PageSearchView = Backbone.View.extend({
    template: JST['app/scripts/templates/page_search.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    events: {},

    el: '#main',

    initialize: function (options) {
      var query = options.query;

      this.collectionLinks = new LinksCollection([], {
        query: query
      });
      this.collectionTags = new TagsCollection([], {
        query: query
      });

      this.listenTo( this.collectionTags, 'reset add change remove', this.render, this );
      this.listenTo( this.collectionLinks, 'reset add change remove', this.render, this );

      this.collectionTags.fetch();
      this.collectionLinks.fetch();

      // this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      // this.$el.html(this.template(this.model.toJSON()));
      // TODO: Make sure links are also converted to JSON
      this.$el.html(this.template(this.collectionTags.toJSON()));
    }
  });

  return PageSearchView;
});
