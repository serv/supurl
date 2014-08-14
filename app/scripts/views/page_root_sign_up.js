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
          // self.hideErrors();
          Backbone.history.navigate('#', true);
        },
        error: function() {
          self.disabledSubmit(false);
          // self.removeCurrentErrors();
          // self.showErrors();
        }
      };

      this.model = new User();
      this.model.save(user, options);
    },

    disabledSubmit: function(state) {
      var selector = '.btn.btn-default.e-sign-up';
      this.$(selector).toggleClass('disabled', state);
    }

  });

  return PageRootSignUpView;
});
