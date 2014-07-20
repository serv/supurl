/*global define*/

define([
  'underscore',
  'backbone',
  'linkModel'
], function (_, Backbone, Link) {
  'use strict';

  var LinksCollection = Backbone.Collection.extend({
    model: Link,

    url: 'http://localhost:3000/api/v0/links'

  });

  return LinksCollection;
});
