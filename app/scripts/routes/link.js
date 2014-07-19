/*global define*/

define([
  'jquery',
  'backbone',
  'newLinkView',
  'showLinkView'
], function ($, Backbone, NewLinkView, ShowLinkView) {
  'use strict';

  var LinkRouter = Backbone.Router.extend({
    routes: {
      'links/new': 'newLink',
      'links/:id': 'showLink'
    },

    newLink: function() {
      var newLinkView = new NewLinkView();
    },

    showLink: function(id) {
      var showLinkView = new ShowLinkView({'id': id});
    }

  });

  return LinkRouter;
});
