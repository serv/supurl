/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'userModel'
], function ($,
             _,
             Backbone,
             JST,
             User) {
  'use strict';

  var PageRootSignUpView = Backbone.View.extend({
    template: JST['app/scripts/templates/page_root_sign_up.ejs'],

    errorMessageTemplate: JST['app/scripts/templates/page_root_user_errors.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.v-sign-up',

    events: {
      'submit .e-page-root-sign-up': 'onSubmit'
    },

    initialize: function() {
      // this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function() {
      // this.$el.html(this.template(this.model.toJSON()));
      this.$el.html(this.template());
    },

    onSubmit: function(e) {
      e.preventDefault();
      this.disabledSubmit(true);

      var self = this,
          user,
          options;

      user = {
        'username': this.$el.find('#input-signup-username').val(),
        'email': this.$el.find('#input-signup-email').val(),
        'password': this.$el.find('#input-signup-password').val(),
        'password_confirmation': this.$el.find('#input-signup-password-confirmation').val()
      };

      options = {
        success: function() {
          self.hideErrors();
          Backbone.history.navigate('#links', true);
        },
        error: function() {
          self.disabledSubmit(false);
          self.removeCurrentErrors();
          self.showErrors();
        }
      };

      this.model = new User();
      this.model.save(user, options);
    },

    showErrors: function() {
      var self = this,
          model = this.model,
          alertMessage,
          renderAlertList;

      alertMessage = function() {

        // Remove hidden class
        self.$('.e-page-root-sign-up .form-message').removeClass('hidden');
      };

      renderAlertList = function() {
        var html = self.errorMessageTemplate(model.toJSON()),
            selector = '.e-page-root-sign-up .form-message';

        self.$(selector).append(html);
      };

      _.each(model.errors, function(error) {
        var controlGroup = self.$('#input-signup-' + error.name).parent();
        controlGroup.addClass('has-error');
      }, self);

      alertMessage();
      renderAlertList();
    },

    hideErrors: function() {
      this.$('.control-group').removeClass('has-error');
    },

    removeCurrentErrors: function() {
      var selector = '.form-message ul';
      this.$(selector).remove();
    },

    disabledSubmit: function(state) {
      var selector = '.btn.btn-default.e-sign-up';
      this.$(selector).toggleClass('disabled', state);
    }

  });

  return PageRootSignUpView;
});
