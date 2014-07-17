/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var LinkModel = Backbone.Model.extend({

    //TODO: fix this api url when we have API
    url: 'http://google.com/link',

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
