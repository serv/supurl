/*global define*/

define([
  'jquery',
  'backbone',
  'pageAboutView',
  'pageHelpView',
  'pageSettingsView',
  'pageSearchView',
  'pageRootView'
], function ($,
             Backbone,
             PageAboutView,
             PageHelpView,
             PageSettingsView,
             PageSearchView,
             PageRootView) {
  'use strict';

  var PageRouter = Backbone.Router.extend({
    routes: {
      '':         'root',
      'about':    'about',
      'help':     'help',
      'settings': 'settings',
      'search/:query':   'search'
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
    },

    search: function(query) {
      new PageSearchView({'query': query});
    }

  });

  return PageRouter;
});
