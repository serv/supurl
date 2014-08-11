/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'tagModel',
  'links'
], function ($,
             _,
             Backbone,
             JST,
             Tag,
             Links) {
  'use strict';

  var TagShowView = Backbone.View.extend({
    template: JST['app/scripts/templates/tag_show.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#main',

    events: {},

    initialize: function (options) {
      this.model = new Tag(options);
      this.model.url = "http://localhost:3000/api/v0/tags/" + options.id;
      this.model.fetch();
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

  return TagShowView;
});
