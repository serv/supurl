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
      var query,
          authParams;

      if (options && ('query' in options)) {
        query = options.query;
      }

      if (query) {
        this.url = 'http://localhost:3000/api/v0/search/links_nav?query='
                   + query;
      } else {

        if (!_.isEmpty($.cookie('accessCode'))
          && !_.isEmpty($.cookie('refreshCode'))) {

          authParams = function() {
            var paramsHash = {
                  access_code: $.cookie('accessCode'),
                  api_key: 'key'
                },
                strings = [];

            _.each(paramsHash, function(element, key) {
              strings.push(key + '=' + encodeURIComponent(element));
            });

            return strings.join('&');
          };

          this.url = 'http://localhost:3000/api/v0/links?' + authParams();
        } else {
          this.url = 'http://localhost:3000/api/v0/links';
        }

      }
    }

  });

  return LinksCollection;
});
