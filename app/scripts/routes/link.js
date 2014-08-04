/*global define*/

define([
  'jquery',
  'backbone',
  'layoutNavigationView',
  'newLinkView',
  'editLinkView',
  'showLinkView',
  'linksView'
], function ($,
             Backbone,
             LayoutNavigationView,
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
      new LayoutNavigationView();
      var newLinkView = new NewLinkView();
    },

    editLink: function(id) {
      new LayoutNavigationView();
      var editLinkView = new EditLinkView({'id': id});
    },

    showLink: function(id) {
      new LayoutNavigationView();
      var showLinkView = new ShowLinkView({'id': id});
    },

    links: function() {
      new LayoutNavigationView();
      var linksView = new LinksView();
    }

  });

  return LinkRouter;
});
