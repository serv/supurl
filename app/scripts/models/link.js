/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var LinkModel = Backbone.Model.extend({
        url: '',

        initialize: function() {
        },

        defaults: {
          url: '',
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
