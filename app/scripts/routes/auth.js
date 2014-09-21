/*global define*/

define([
  'jquery',
  'backbone',
  'callbackAuthView',
  'sessionsHelper',
  'pageRootView'
], function ($, Backbone, CallbackAuthView, SessionsHelper, PageRootView) {
  'use strict';

  var AuthRouter = Backbone.Router.extend({
    routes: {
      'auth/callback': 'callbackAuth',
      'sign_out': 'signOut'
    },

    callbackAuth: function() {
      var callbackAuthView = new CallbackAuthView();
    },

    signOut: function() {
      SessionsHelper.signOut();
      Backbone.history.navigate('#', true);
    }

  });

  return AuthRouter;
});
