/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var AlertModel = Backbone.Model.extend({
    url: '',

    initialize: function() {
    },

    defaults: {
      message: '',
      style: '',
      displayOn: ''
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    },

    styleArray: ['success', 'failure', 'warning']
  });

  return AlertModel;
});
