/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'typeahead',
  'sessionsHelper',
  'userModel',
  'layoutNavigationCogwheelDropdownView'
], function ($,
             _,
             Backbone,
             JST,
             Typeahead,
             SessionsHelper,
             User,
             LayoutNavigationCogwheelDropdownView) {
  'use strict';

  var LayoutNavigationView = Backbone.View.extend({
    template: JST['app/scripts/templates/layout_navigation.ejs'],

    templateLinkSearchPartial: JST['app/scripts/templates/layout_navigation_link.ejs'],

    templateTagSearchPartial: JST['app/scripts/templates/layout_navigation_tag.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.layout-navigation',

    events: {
      'keydown': 'processKey'
    },

    initialize: function () {
      SessionsHelper.isSignedIn();
      this.render();
      this.renderPartialViews();
    },

    render: function () {

      // Include SessionsHelper into template methods
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
    },

    renderPartialViews: function() {
      var view,
          currentUser;

      var view = new LayoutNavigationCogwheelDropdownView();
    }
  });

  return LayoutNavigationView;
});
