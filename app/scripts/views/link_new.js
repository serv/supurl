/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'typeahead',
  'linkModel'
], function ($,
             _,
             Backbone,
             JST,
             Typeahead,
             Link) {
  'use strict';

  var LinksNewView = Backbone.View.extend({
    template: JST['app/scripts/templates/link_new.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#main',

    events: {
      'submit form': 'onSubmit'
    },

    initialize: function () {
      this.model = new Link();
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      // this.$el.html(this.template(this.model.toJSON()));
      this.$el.html(this.template(this.model));
      this.tagTypeahead();
    },

    onSubmit: function(e) {
      e.preventDefault();

      this.model = new Link();
      this.model.save({
        title:         this.$el.find('#input-title').val(),
        href:          this.$el.find('#input-href').val(),
        tags:          this.parseTags(),
        suggestedTags: this.$el.find('#input-suggested-tags').val(),
        comment:       this.$el.find('#input-comment').val()
      });

      Backbone.history.navigate('#', true);
    },

    parseTags: function() {
      var rawTags,
          splitTags,
          tagsArray;

      rawTags = this.$el.find('#input-tags').val();

      if (rawTags) {
        splitTags = rawTags.split(',');
        tagsArray = _.chain(splitTags)
                     .map(function(tagString) {

                       // trim whitespace and multiple whitespaces into 1
                       return $.trim(tagString).replace(/  +/g, ' ');
                     })
                     .reject(function(tagString) {
                       return tagString.length < 1;
                     })
                     .value();

        return tagsArray;
      } else {
        return [];
      }
    },

    tagTypeahead: function() {
      var remoteUrl = 'http://localhost:3000/api/v0/search/tags_nav?query=%QUERY',
          linkTags = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: [],
            remote: remoteUrl
          });

      linkTags.initialize();

      $('.tags-field .typeahead').typeahead({
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

  return LinksNewView;
});
