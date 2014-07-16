/*global define*/

define([
  'jquery',
  'backbone',
  'aboutView',
  'pageRootView'
], function ($,
             Backbone,
             AboutView,
             PageRootView) {
  'use strict';

  var PageRouter = Backbone.Router.extend({
    routes: {
      '':      'root',
      'about': 'about'
    },

    root: function() {
      new PageRootView();
    },

    about: function() {
      new AboutView();
    }

  });

  return PageRouter;
});
