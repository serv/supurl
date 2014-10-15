/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'userModel',
  'alertView',
  'sessionsHelper'
], function ($,
             _,
             Backbone,
             JST,
             User,
             AlertView,
             SessionsHelper) {
  'use strict';

  var PageRootSignUpView = Backbone.View.extend({
    template: JST['app/scripts/templates/page_root_sign_up.ejs'],

    errorMessageTemplate: JST['app/scripts/templates/page_root_user_errors.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.v-sign-up',

    events: {
      'click .e-sign-up': 'onSubmit'
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

      $.removeCookie('accessCode');
      $.removeCookie('refreshCode');

      var self = this,
          signUpUrl = 'http://localhost:3000/v0/auth/sign_up'
                    + '?api_key=key&redirect_uri=%23/auth/callback',
          options = 'height=500,width=400',
          popUp = window.open(signUpUrl, 'Sign up using Supurl acount', options),
          message,
          accessCode,
          refreshCode,
          token,
          oauthInterval = window.setInterval(function() {
            if (popUp.closed) {
              window.clearInterval(oauthInterval);

              accessCode = $.cookie('accessCode');
              refreshCode = $.cookie('refreshCode');

              if (accessCode && refreshCode) {

                window.common.currentUser.set({
                  token: {
                    accessCode: accessCode,
                    refreshCode: refreshCode
                  }
                });

                // Updates user info and cookie
                window.common.currentUser.userInfoViaAccessCode();

                // TODO: Need to refactor this.
                // Include token header every ajax request sent
                SessionsHelper.setAjaxHeader({
                  accessCode: accessCode
                });

                Backbone.history.navigate('#/links', true);

                new AlertView({
                  alert: {
                    message: 'Signed up successfully!',
                    style: 'success',
                    displayOn: '#/links'
                  }
                });
              }
            }
          }, 500);

    }

  });

  return PageRootSignUpView;
});
