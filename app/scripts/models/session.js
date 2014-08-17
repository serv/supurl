/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var SessionModel = Backbone.Model.extend({
    url: 'http://localhost:3000/api/v0/sessions',

    errors: [],

    initialize: function() {
    },

    defaults: {
      'username_email': '',
      'password': '',
      'signin_type': ''
    },

    validate: function(attrs, options) {
      var errors,
          errorHash = {};
      this.errors = [];
      errors = this.errors;

      if (!attrs.username_email) {
        errorHash = {name: 'username-email', message: 'Please enter the email.'};
        errors.push(errorHash);
      }
      if (!attrs.password) {
        errorHash = {name: 'password', message: 'Please enter the password.'};
        errors.push(errorHash);
      }
    },

    parse: function(response, options)  {
      if (response.cookies) {
        _.each(response.cookies, function(value, key) {
          $.cookie(key, value);
        });
      }

      return response;
    }
  });

  return SessionModel;
});
