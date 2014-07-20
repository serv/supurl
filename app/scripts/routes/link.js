/*global define*/

define([
  'jquery',
  'backbone',
  'newLinkView',
  'showLinkView',
  'linksView'
], function ($, Backbone, NewLinkView, ShowLinkView, LinksView) {
  'use strict';

  var LinkRouter = Backbone.Router.extend({
    routes: {
      'links/new': 'newLink',
      'links/:id': 'showLink',
      'links':     'links'
    },

    newLink: function() {
      var newLinkView = new NewLinkView();
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
