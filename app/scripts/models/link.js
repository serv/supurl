/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var LinkModel = Backbone.Model.extend({

    //TODO: fix this api url when we have API
    urlRoot: 'http://localhost:3000/api/v0/links',

    initialize: function() {
    },

    defaults: {
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
