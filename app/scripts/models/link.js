/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var LinkModel = Backbone.Model.extend({

    url: 'http://localhost:3000/api/v0/links',

    initialize: function() {
    },

    defaults: {
      id: null,
      href: '',
      tags: '',
      title: '',
      suggestedTags: '',
      comment: ''
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    }
  });

  return LinkModel;
});
