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

    errorMessageTemplate: JST['app/scripts/templates/link_errors.ejs'],

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
      this.disabledSubmit(true);

      var self = this,
          link,
          options;

      link = {
        title:         this.$el.find('#input-title').val(),
        href:          this.$el.find('#input-href').val(),
        tags:          this.$el.find('#input-tags').val(),
        suggestedTags: this.$el.find('#input-suggested-tags').val(),
        comment:       this.$el.find('#input-comment').val()
      };

      options = {
        success: function() {
          self.hideErrors();
          Backbone.history.navigate('#', true);
        },
        error: function() {
          self.disabledSubmit(false);
          self.removeCurrentErrors();
          self.showErrors();
        }
      };

      this.model.url = "http://localhost:3000/api/v0/links/" + this.id;
      this.model.save(link, options);
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
    },

    removeCurrentErrors: function() {
      var selector = '.form-message ul';
      this.$(selector).remove();
    },

    disabledSubmit: function(state) {
      var selector = '.btn.btn-default';
      this.$(selector).toggleClass('disabled', state);
    }


  });

  return LinkEditView;
});
