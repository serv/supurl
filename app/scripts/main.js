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
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',

        pageRouter: 'routes/page',
        aboutView: 'views/about',

        linkRouter: 'routes/link',
        linkModel: 'models/link',
        newLinkView: 'views/link_new'


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
