/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'typeahead'
], function ($,
             _,
             Backbone,
             JST,
             Typeahead) {
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
      this.searchTypeahead();
    },

    searchTypeahead: function() {
      var remoteUrl = 'http://localhost:3000/api/v0/tags/search_by_name?displayName=%QUERY',
          linkTags = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: [],
            remote: remoteUrl
          });

      linkTags.initialize();

      $('.search.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'link-tags',
        displayKey: 'display_name',
        source: linkTags.ttAdapter()
      });
    }
  });

  return LayoutNavigationView;
});
