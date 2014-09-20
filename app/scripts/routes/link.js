/*global define*/

define([
  'jquery',
  'backbone',
  'newLinkView',
  'editLinkView',
  'showLinkView',
  'linksView',
  'sessionsHelper'
], function ($,
             Backbone,
             NewLinkView,
             EditLinkView,
             ShowLinkView,
             LinksView,
             SessionsHelper) {
  'use strict';

  var LinkRouter = Backbone.Router.extend({
    routes: {
      'links/new':      'newLink',
      'links/:id/edit': 'editLink',
      'links/:id':      'showLink',
      'links':          'links'
    },

    newLink: function() {
      if (SessionsHelper.isSignedIn()) {
        new NewLinkView();
      } else {
        // TODO: Display need to log in error message
      }

    },

    editLink: function(id) {
      if (SessionsHelper.isSignedIn()) {
        new EditLinkView({'id': id});
      } else {
        // TODO: Display need to log in error message
      }
    },

    showLink: function(id) {
      if (SessionsHelper.isSignedIn()) {
        new ShowLinkView({'id': id});
      } else {
        // TODO: Display need to log in error message
      }
    },

    links: function() {
      if (SessionsHelper.isSignedIn()) {
        new LinksView();
      } else {
        // TODO: Display need to log in error message
      }
    }

  });

  return LinkRouter;
});
