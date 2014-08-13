/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var PageRootSignUpView = Backbone.View.extend({
    template: JST['app/scripts/templates/page_root_sign_up.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.v-sign-up',

    events: {},

    initialize: function () {
      // this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      // this.$el.html(this.template(this.model.toJSON()));
      this.$el.html(this.template());
    }
  });

  return PageRootSignUpView;
});
