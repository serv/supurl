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

  var LinksNewView = Backbone.View.extend({
    template: JST['app/scripts/templates/link_new.ejs'],

    errorMessageTemplate: JST['app/scripts/templates/link_errors.ejs'],

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

      var self = this,
          link,
          options;

      link = {
        title:         this.$el.find('#input-title').val(),
        href:          this.$el.find('#input-href').val(),
        tags:          this.parseTags(),
        suggestedTags: this.$el.find('#input-suggested-tags').val(),
        comment:       this.$el.find('#input-comment').val()
      };

      options = {
        success: function() {
          self.hideErrors();
          Backbone.history.navigate('#', true);
        },
        error: function() {
          self.showErrors();
        }
      };

      this.model = new Link();
      this.model.save(link, options);
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
    },

    showErrors: function() {
      var self = this,
          model = this.model,
          alertMessage,
          renderAlertList;

      alertMessage = function() {

        // Remove hidden class
        self.$('.form-message').removeClass('hidden');
      };

      renderAlertList = function() {
        var html = self.errorMessageTemplate(model.toJSON()),
            selector = '.form-message';

        self.$(selector).append(html);
      };

      _.each(model.errors, function(error) {
        var controlGroup = self.$('#input-' + error.name).parent();
        controlGroup.addClass('has-error');
      }, self);

      alertMessage();
      renderAlertList();
    },

    hideErrors: function() {
      this.$('.control-group').removeClass('error');
    }

  });

  return LinksNewView;
});
