/*global define*/

define([
  'jquery',
  'backbone',
  'pageAboutView',
  'pageRootView'
], function ($,
             Backbone,
             PageAboutView,
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
      new PageAboutView();
    }

  });

  return PageRouter;
});
