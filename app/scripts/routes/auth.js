/*global define*/

define([
  'jquery',
  'backbone',
  'callbackAuthView'
], function ($, Backbone, CallbackAuthView) {
  'use strict';

  var AuthRouter = Backbone.Router.extend({
    routes: {
      'auth/callback': 'callbackAuth'
    },

    callbackAuth: function() {
      var callbackAuthView = new CallbackAuthView();
    }

  });

  return AuthRouter;
});
