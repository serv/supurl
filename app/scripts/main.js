/*global require*/
'use strict';

require.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  },
  paths: {
    jquery:           '../bower_components/jquery/dist/jquery',
    backbone:         '../bower_components/backbone/backbone',
    underscore:       '../bower_components/lodash/dist/lodash',
    bootstrap:        '../bower_components/sass-bootstrap/dist/js/bootstrap',
    typeahead:        '../bower_components/typeahead.js/dist/typeahead.bundle',

    layoutNavigationView: 'views/layout_navigation',

    pageRouter:       'routes/page',
    pageAboutView:    'views/page_about',
    pageHelpView:     'views/page_help',
    pageSettingsView: 'views/page_settings',
    pageRootView:     'views/page_root',

    linkRouter:       'routes/link',
    linkModel:        'models/link',
    newLinkView:      'views/link_new',
    editLinkView:     'views/link_edit',
    showLinkView:     'views/link_show',
    links:            'collections/links',
    linksView:        'views/links'

  }
});

require([
  'backbone',
  'bootstrap',
  'pageRouter',
  'linkRouter'
], function (Backbone,
             Bootstrap,
             PageRouter,
             LinkRouter) {

  var pageRouter = new PageRouter();
  var linkRouter = new LinkRouter();
  Backbone.history.start();
});
