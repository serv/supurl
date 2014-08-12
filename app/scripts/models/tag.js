/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var TagModel = Backbone.Model.extend({
    url: 'http://localhost:3000/api/v0/tags',

    initialize: function() {
    },

    defaults: {
      shortcut: '',
      displayName: '',
      links: []
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    }
  });

  return TagModel;
});
