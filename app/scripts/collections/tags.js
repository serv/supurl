/*global define*/

define([
  'underscore',
  'backbone',
  'tagModel'
], function (_, Backbone, Tag) {
  'use strict';

  var TagsCollection = Backbone.Collection.extend({
    model: Tag,

    initialize: function(models, options) {
      var query;

      if (options && ('query' in options)) {
        query = options.query;
      }

      if (query) {
        this.url = 'http://localhost:3000/api/v0/search/tags_nav?query='
                   + query;
      } else {
        this.url = 'http://localhost:3000/api/v0/tags';
      }
    }

  });

  return TagsCollection;
});
