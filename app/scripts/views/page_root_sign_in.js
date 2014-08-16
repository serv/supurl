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
      // this.disabledSubmit(true);

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
          // self.hideErrors();
          Backbone.history.navigate('#', true);
        },
        error: function() {
          // self.disabledSubmit(false);
          // self.removeCurrentErrors();
          // self.showErrors();
        }
      };

      this.model = new Session();
      this.model.save(session, options);
    },


  });

  return PageRootSignInView;
});
