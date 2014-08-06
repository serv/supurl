/*global define*/

define([
  'jquery',
  'backbone',
  'newLinkView',
  'editLinkView',
  'showLinkView',
  'linksView'
], function ($,
             Backbone,
             NewLinkView,
             EditLinkView,
             ShowLinkView,
             LinksView) {
  'use strict';

  var LinkRouter = Backbone.Router.extend({
    routes: {
      'links/new':      'newLink',
      'links/:id/edit': 'editLink',
      'links/:id':      'showLink',
      'links':          'links'
    },

    newLink: function() {
      var newLinkView = new NewLinkView();
    },

    editLink: function(id) {
      var editLinkView = new EditLinkView({'id': id});
    },

    showLink: function(id) {
      var showLinkView = new ShowLinkView({'id': id});
    },

    links: function() {
      var linksView = new LinksView();
    }

  });

  return LinkRouter;
});
