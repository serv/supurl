/*global define*/

define([
  'jquery',
  'backbone',
  'newLinkView',
  'editLinkView',
  'showLinkView',
  'linksView',
  'sessionsHelper',
  'alertView'
], function ($,
             Backbone,
             NewLinkView,
             EditLinkView,
             ShowLinkView,
             LinksView,
             SessionsHelper,
             AlertView) {
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
        Backbone.history.navigate('#', true);
        new AlertView({
          alert: {
            message: 'You need to sign in first.',
            style: 'danger',
            displayOn: '#'
          }
        });
      }

    },

    editLink: function(id) {
      if (SessionsHelper.isSignedIn()) {
        new EditLinkView({'id': id});
      } else {
        Backbone.history.navigate('#', true);
        new AlertView({
          alert: {
            message: 'You need to sign in first.',
            style: 'danger',
            displayOn: '#'
          }
        });
      }
    },

    showLink: function(id) {
      if (SessionsHelper.isSignedIn()) {
        new ShowLinkView({'id': id});
      } else {
        Backbone.history.navigate('#', true);
        new AlertView({
          alert: {
            message: 'You need to sign in first.',
            style: 'danger',
            displayOn: '#'
          }
        });
      }
    },

    links: function() {
      if (SessionsHelper.isSignedIn()) {
        new LinksView();
      } else {
        Backbone.history.navigate('#', true);
        new AlertView({
          alert: {
            message: 'You need to sign in first.',
            style: 'danger',
            displayOn: '#'
          }
        });
      }
    }

  });

  return LinkRouter;
});
