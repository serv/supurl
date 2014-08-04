/*global define*/

define([
  'jquery',
  'backbone',
  'layoutNavigationView',
  'pageAboutView',
  'pageHelpView',
  'pageSettingsView',
  'pageRootView'
], function ($,
             Backbone,
             LayoutNavigationView,
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
      new LayoutNavigationView();
      new PageRootView();
    },

    about: function() {
      new LayoutNavigationView();
      new PageAboutView();
    },

    help: function() {
      new LayoutNavigationView();
      new PageHelpView();
    },

    settings: function() {
      new LayoutNavigationView();
      new PageSettingsView();
    }

  });

  return PageRouter;
});
