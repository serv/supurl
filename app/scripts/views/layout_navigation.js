/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($,
             _,
             Backbone,
             JST) {
  'use strict';

  var LayoutNavigationView = Backbone.View.extend({
    template: JST['app/scripts/templates/layout_navigation.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.layout-navigation',

    events: {},

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html(this.template());
    }
  });

  return LayoutNavigationView;
});
