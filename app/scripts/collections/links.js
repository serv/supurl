/*global define*/

define([
  'underscore',
  'backbone',
  'linkModel'
], function (_, Backbone, Link) {
  'use strict';

  var LinksCollection = Backbone.Collection.extend({
    model: Link,

    initialize: function(models, options) {
      var query = options.query;

      if (query) {
        this.url = 'http://localhost:3000/api/v0/search/links_nav?query='
                   + query;
      } else {
        this.url = 'http://localhost:3000/api/v0/links';
      }
    }

  });

  return LinksCollection;
});
