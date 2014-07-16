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
    jquery:     '../bower_components/jquery/dist/jquery',
    backbone:   '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/dist/lodash',
    bootstrap:  '../bower_components/sass-bootstrap/dist/js/bootstrap',

    backboneForms:           '../bower_components/backbone-forms/distribution/backbone-forms',
    backboneFormsBootstrap:  '../bower_components/backbone-forms/distribution/templates/bootstrap3',
    // backbone-bootstrap-modal: '../bower_components/backbone.bootstrap-modal/src/backbone.bootstrap-modal',

    pageRouter:       'routes/page',
    pageAboutView:    'views/page_about',
    pageRootView:     'views/page_root',

    linkRouter:       'routes/link',
    linkModel:        'models/link',
    linkForm:         'forms/link_form',
    newLinkView:      'views/link_new',
    showLinkView:     'views/link_show'

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
