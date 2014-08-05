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
      var remoteUrlTags =
            'http://localhost:3000/api/v0/search/tags_nav?query=%QUERY',
          remoteUrlLinks =
            'http://localhost:3000/api/v0/search/links_nav?query=%QUERY',
          searchTags = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: [],
            remote: remoteUrlTags
          }),
          searchLinks = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: [],
            remote: remoteUrlLinks
          });

      searchTags.initialize();
      searchLinks.initialize();

      $('.search.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'search-tags',
        displayKey: 'display_name',
        source: searchTags.ttAdapter(),
        templates: {
          header: '<h3 class="typeahead-type-header">Tags</h3>'
        }
      },
      {
        name: 'search-links',
        displayKey: 'title',
        source: searchLinks.ttAdapter(),
        templates: {
          header: '<h3 class="typeahead-type-header">Links</h3>'
        }
      });
    }
  });

  return LayoutNavigationView;
});
