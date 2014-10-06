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

  var LayoutNavigationSearchBarView = Backbone.View.extend({
    template: JST['app/scripts/templates/layout_navigation_search_bar.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.search-bar',

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
    }
  });

  return LayoutNavigationSearchBarView;
});
