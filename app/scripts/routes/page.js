/*global define*/

define([
  'jquery',
  'backbone',
  'pageAboutView',
  'pageHelpView',
  'pageSettingsView',
  'pageRootView'
], function ($,
             Backbone,
             PageAboutView,
             PageHelpView,
             PageSettingsView,
             PageRootView) {
  'use strict';

  var PageRouter = Backbone.Router.extend({
    routes: {
      '':         'root',
      'about':    'about',
      'help':     'help',
      'settings': 'settings'
    },

    root: function() {
      new PageRootView();
    },

    about: function() {
      new PageAboutView();
    },

    help: function() {
      new PageHelpView();
    },

    settings: function() {
      new PageSettingsView();
    }

  });

  return PageRouter;
});
