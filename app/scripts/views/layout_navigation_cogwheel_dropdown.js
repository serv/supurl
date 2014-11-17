/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'sessionsHelper',
  'userModel',
  'common'
], function ($,
             _,
             Backbone,
             JST,
             SessionsHelper,
             User,
             Common) {
  'use strict';

  var common = Common.getInstance();

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
      this.listenTo(common.get('currentUser'), 'change', this.render);
    },

    render: function () {
      var data = {};
      _.extend(data, SessionsHelper);
      this.$el.html(this.template(data));
    },
  });

  return LayoutNavigationCogwheelDropdownView;
});
