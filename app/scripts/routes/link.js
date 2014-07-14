/*global define*/

define([
    'jquery',
    'backbone',
    'newLinkView'
], function ($, Backbone, NewLinkView) {
    'use strict';

    var LinkRouter = Backbone.Router.extend({
        routes: {
          'link/new': 'newLink'
        },

        newLink: function() {
          var newLinkView = new NewLinkView();
        }

    });

    return LinkRouter;
});
