/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'sessionsHelper',
  'userModel'
], function ($,
             _,
             Backbone,
             JST,
             SessionsHelper,
             User) {
  'use strict';

  var LayoutNavigationCogwheelDropdownView = Backbone.View.extend({
    template: JST['app/scripts/templates/layout_navigation_cogwheel_dropdown.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.dropdown-menu',

    events: {},

    initialize: function () {
      if (SessionsHelper.isSignedIn()) {
        this.render();
      }

      this.listenTo(window.common.currentUser, 'change', this.render);
    },

    render: function () {
      var data = {};
      _.extend(data, SessionsHelper);
      this.$el.html(this.template(data));
    },
  });

  return LayoutNavigationCogwheelDropdownView;
});
