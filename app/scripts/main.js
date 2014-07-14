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
        
    }
});

require([
    'backbone',
    'bootstrap',
    'pageRouter'
], function (Backbone,
             Bootstrap,
             PageRouter) {
    var router = new PageRouter();
    Backbone.history.start();
});
