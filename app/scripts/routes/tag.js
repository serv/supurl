/*global define*/

define([
  'jquery',
  'backbone',
  'showTagView'
], function ($,
           Backbone,
           ShowTagView) {
  'use strict';

  var TagRouter = Backbone.Router.extend({
    routes: {
      'tags/:id': 'showTag'
    },

    showTag: function(id) {
      new ShowTagView({'id': id});
    }

  });


  return TagRouter;
});
