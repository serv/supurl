/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'linkModel',
  'linkForm'
], function ($, _, Backbone, JST, Link, LinkForm) {
  'use strict';

  var LinksNewView = Backbone.View.extend({
    template: JST['app/scripts/templates/link_new.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#main',

    events: {},

    initialize: function () {
      var form,
          link = new Link();

      this.model = link;

      form = new LinkForm({
        model: link
      }).render();
      this.form = form;

      this.setSuggestedTags();
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      // this.$el.html(this.template(this.model.toJSON()));

      // Render link_new.ejs
      // Then append link_form.ejs onto '.link-form'
      this.$el.html(this.template(this.model));
      $('.link-form').append(this.form.el);
    },

    // Create and set a tags collection of suggested tags
    setSuggestedTags: function() {
      var suggestedTags = [];
      this.model.set({suggestedTags: suggestedTags});
    }
  });

  return LinksNewView;
});
