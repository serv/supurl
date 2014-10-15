/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'typeahead',
  'sessionsHelper',
  'userModel',
  'layoutNavigationCogwheelDropdownView',
  'layoutNavigationSearchBarView'
], function ($,
             _,
             Backbone,
             JST,
             Typeahead,
             SessionsHelper,
             User,
             LayoutNavigationCogwheelDropdownView,
             LayoutNavigationSearchBarView) {
  'use strict';

  var LayoutNavigationView = Backbone.View.extend({
    template: JST['app/scripts/templates/layout_navigation.ejs'],

    templateLinkSearchPartial: JST['app/scripts/templates/layout_navigation_link.ejs'],

    templateTagSearchPartial: JST['app/scripts/templates/layout_navigation_tag.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.layout-navigation',

    events: {},

    initialize: function () {
      this.render();
      this.renderPartialViews();
    },

    render: function () {

      // Include SessionsHelper into template methods
      var data = {};
      _.extend(data, SessionsHelper);
      this.$el.html(this.template(data));
    },

    renderPartialViews: function() {
      var cogwheelDropdownView = new LayoutNavigationCogwheelDropdownView(),
          searchBar = new LayoutNavigationSearchBarView();
    }
  });

  return LayoutNavigationView;
});
