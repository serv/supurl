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
      this.searchTypeahead();
    },

    searchTypeahead: function() {
      this.initSearchTypeahead();

      $('.search.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'search-tags',
        displayKey: 'display_name',
        source: this.searchTags.ttAdapter(),
        templates: {
          header: '<h3 class="typeahead-type-header">Tags</h3>',
          suggestion: this.templateTagSearchPartial
        }
      },
      {
        name: 'search-links',
        displayKey: 'title',
        source: this.searchLinks.ttAdapter(),
        templates: {
          header: '<h3 class="typeahead-type-header">Links</h3>',
          suggestion: this.templateLinkSearchPartial
        }
      });
    },

    initSearchTypeahead: function() {
      var remoteUrlTags =
            'http://localhost:3000/api/v0/search/tags_nav?query=%QUERY',
          remoteUrlLinks =
            'http://localhost:3000/api/v0/search/links_nav?query=%QUERY';

      this.searchTags = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: [],
        remote: remoteUrlTags
      }),
      this.searchLinks = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: [],
        remote: remoteUrlLinks
      });

      this.searchTags.initialize();
      this.searchLinks.initialize();
    },

    currentQuery: function() {
      return this.$('.search.tt-input').val()
    },

    processKey: function(e) {
      var query = this.currentQuery();

      // enter key
      if (e.which === 13) {
        Backbone.history.navigate('#search/' + query, true);
      }
    }
  });

  return LayoutNavigationSearchBarView;
});
