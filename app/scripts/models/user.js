/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var UserModel = Backbone.Model.extend({

    url: 'http://localhost:3000/api/v0/users',

    errors: [],

    initialize: function() {
    },

    defaults: {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    },

    validate: function(attrs, options) {
      var errors,
          errorHash = {};
      this.errors = [];
      errors = this.errors;

      if (!attrs.username) {
        errorHash = {name: 'username', message: 'Please enter the username.'};
        errors.push(errorHash);
      }
      if (!attrs.email) {
        errorHash = {name: 'email', message: 'Please enter the email.'};
        errors.push(errorHash);
      }
      if (!attrs.password) {
        errorHash = {name: 'password', message: 'Please enter the password.'};
        errors.push(errorHash);
      }
      if (!attrs.password_confirmation) {
        errorHash = {
          name: 'password-confirmation',
          message: 'Please enter the password confirmation.'
        };
        errors.push(errorHash);
      }
    },

    parse: function(response, options)  {
      return response;
    }
  });

  return UserModel;
});
