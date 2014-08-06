/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'typeahead',
  'tokenfield',
  'linkModel'
], function ($,
             _,
             Backbone,
             JST,
             Typeahead,
             Tokenfield,
             Link) {
  'use strict';

  var LinkEditView = Backbone.View.extend({
    template: JST['app/scripts/templates/link_edit.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#main',

    events: {
      'submit form': 'onSubmit'
    },

    initialize: function (attr) {
      this.model = new Link(attr);
      this.id = attr['id'];
      this.model.url = "http://localhost:3000/api/v0/links/" + this.id;
      this.model.fetch();
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      this.$el.html(this.template(this.model));
      this.formPopulate();
      this.tagTypeahead();
    },

    onSubmit: function(e) {
      e.preventDefault();

      this.model = new Link({id: this.id});
      this.model.url = "http://localhost:3000/api/v0/links/" + this.id;
      this.model.save({
        title:         this.$el.find('#input-title').val(),
        href:          this.$el.find('#input-href').val(),
        tags:          this.$el.find('#input-tags').val(),
        suggestedTags: this.$el.find('#input-suggested-tags').val(),
        comment:       this.$el.find('#input-comment').val()
      });

      Backbone.history.navigate('#', true);
    },

    formPopulate: function() {
      var model = this.model,
          getTags = function() {
            var tagsArray = [];

            if (model.get('taggables')) {
              _.each(model.get('taggables'), function(tag) {
                tagsArray.push(tag.display_name);
              });
            }

            return tagsArray.join(', ');
          };

      this.$el.find('#input-title').val(this.model.get('title'));
      this.$el.find('#input-href').val(this.model.get('href'));
      this.$el.find('#input-tags').val(getTags());
      this.$el.find('#input-suggested-tags').val(this.model.get('suggestedTags'));
      this.$el.find('#input-comment').val(this.model.get('comment'));
    },

    tagTypeahead: function() {
      var typeaheadHash = {},
          remoteUrl = 'http://localhost:3000/api/v0/search/tags_nav?query=%QUERY',
          linkTags = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: [],
            remote: remoteUrl
          });

      linkTags.initialize();

      typeaheadHash = {
        name: 'link-tags',
        displayKey: 'display_name',
        source: linkTags.ttAdapter()
      };

      $('.tokenfield-typeahead').tokenfield({
        typeahead: [null, typeaheadHash]
      });
    }

  });

  return LinkEditView;
});
