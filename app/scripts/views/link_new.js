/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'linkModel'
], function ($, _, Backbone, JST, Link) {
  'use strict';

  var LinksNewView = Backbone.View.extend({
    template: JST['app/scripts/templates/link_new.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#main',

    events: {
      'submit form': 'onSubmit'
    },

    initialize: function () {
      this.model = new Link();
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      // this.$el.html(this.template(this.model.toJSON()));
      this.$el.html(this.template(this.model));
    },

    onSubmit: function(e) {
      e.preventDefault();

      this.model.save({
        title:         this.$el.find('#input-title').val(),
        href:          this.$el.find('#input-href').val(),
        tags:          this.$el.find('#input-tags').val(),
        suggestedTags: this.$el.find('#input-suggested-tags').val(),
        comment:       this.$el.find('#input-comment').val()
      });

      Backbone.history.navigate('#', true);
    }
  });

  return LinksNewView;
});
