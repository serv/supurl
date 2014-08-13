/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'pageRootSignUpView'
], function ($,
             _,
             Backbone,
             JST,
             PageRootSignUpView) {
  'use strict';

  var PageRootView = Backbone.View.extend({
    template: JST['app/scripts/templates/page_root.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#main',

    events: {},

    initialize: function () {
      this.render();
      this.renderPartialViews();
    },

    render: function () {
      this.$el.html(this.template());
    },

    renderPartialViews: function() {
      var pageRootSignUpView = new PageRootSignUpView();
    }
  });

  return PageRootView;
});
