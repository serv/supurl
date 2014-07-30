/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var PageHelpView = Backbone.View.extend({
    template: JST['app/scripts/templates/page_help.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#main',

    events: {},

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html(this.template());
    }
  });

  return PageHelpView;
});
