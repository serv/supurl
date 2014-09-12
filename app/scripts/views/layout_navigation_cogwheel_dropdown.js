/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'common',
  'sessionsHelper'
], function ($,
             _,
             Backbone,
             JST,
             common,
             SessionsHelper) {
  'use strict';

  var LayoutNavigationCogwheelDropdownView = Backbone.View.extend({
    template: JST['app/scripts/templates/layout_navigation_cogwheel_dropdown.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.dropdown-menu',

    events: {},

    initialize: function () {
      // this.model = common.currentUser;
      // this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      var data = {};
      _.extend(data, SessionsHelper);

      this.$el.html(this.template(data));
    }
  });

  return LayoutNavigationCogwheelDropdownView;
});
