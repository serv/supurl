/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'sessionModel'
], function ($,
             _,
             Backbone,
             JST,
             Session) {
  'use strict';

  var PageRootSignInView = Backbone.View.extend({
    template: JST['app/scripts/templates/page_root_sign_in.ejs'],

    errorMessageTemplate: JST['app/scripts/templates/page_root_user_errors.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.v-sign-in',

    events: {
      'submit .e-page-root-sign-in': 'onSubmit'
    },

    initialize: function () {
      // this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      // this.$el.html(this.template(this.model.toJSON()));
      this.$el.html(this.template());
    },

    onSubmit: function(e) {
      e.preventDefault();
      this.disabledSubmit(true);

      var self = this,
          session,
          options,
          determineUsernameOrEmail;

      determineUsernameOrEmail = function(username_email) {
        if (username_email.indexOf('@') === -1) {
          return 'username';
        } else {
          return 'email';
        }
      };

      session = {
        'username_email': this.$el.find('#input-signin-username-email').val(),
        'password': this.$el.find('#input-signin-password').val(),
        'signin_type': ''
      };
      session.signin_type = determineUsernameOrEmail(session.username_email);

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

      this.model = new Session();
      this.model.save(session, options);
    },

    showErrors: function() {
      var self = this,
          model = this.model,
          alertMessage,
          renderAlertList;

      alertMessage = function() {

        // Remove hidden class
        self.$('.e-page-root-sign-in .form-message').removeClass('hidden');
      };

      renderAlertList = function() {
        var html = self.errorMessageTemplate(model.toJSON()),
            selector = '.e-page-root-sign-in .form-message';

        self.$(selector).append(html);
      };

      _.each(model.errors, function(error) {
        var controlGroup = self.$('#input-signin-' + error.name).parent();
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
      var selector = '.btn.btn-default.e-sign-in';
      this.$(selector).toggleClass('disabled', state);
    }


  });

  return PageRootSignInView;
});
