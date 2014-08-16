/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var SessionModel = Backbone.Model.extend({
    url: 'http://localhost:3000/api/v0/sessions',

    initialize: function() {
    },

    defaults: {
      'username_email': '',
      'password': '',
      'signin_type': ''
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
        return response;
    }
  });

  return SessionModel;
});
