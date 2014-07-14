/*global define*/

define([
    'jquery',
    'backbone',
    'aboutView'
], function ($, Backbone, AboutView) {
    'use strict';

    var PageRouter = Backbone.Router.extend({
        routes: {
          '':      'root',
          'about': 'about'
        },

        root: function() {
        },

        about: function() {
          new AboutView();
        }

    });

    return PageRouter;
});
