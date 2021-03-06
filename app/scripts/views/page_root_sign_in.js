/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'sessionModel',
  'alertView',
  'common',
  'sessionsHelper'
], function ($,
             _,
             Backbone,
             JST,
             Session,
             AlertView,
             Common,
             SessionsHelper) {
  'use strict';

  var PageRootSignInView = Backbone.View.extend({
    template: JST['app/scripts/templates/page_root_sign_in.ejs'],

    errorMessageTemplate: JST['app/scripts/templates/page_root_user_errors.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.v-sign-in',

    events: {
      'click .e-sign-in': 'onSubmit'
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

      var common = Common.getInstance();

      $.removeCookie('accessCode');
      $.removeCookie('refreshCode');

      var self = this,
          signInUrl = 'http://localhost:3000/v0/auth/sign_in'
                    + '?api_key=key&redirect_uri=%23/auth/callback'
                    + '&method=implicit',
          options = 'height=500,width=400',
          popUp = window.open(signInUrl, 'Sign in using Supurl acount', options),
          message,
          accessCode,
          refreshCode,
          oauthInterval = window.setInterval(function() {
            if (popUp.closed) {
              window.clearInterval(oauthInterval);

              accessCode = $.cookie('accessCode');
              refreshCode = $.cookie('refreshCode');

              if (accessCode && refreshCode) {

                common.get('currentUser').set({
                  token: {
                    accessCode: accessCode,
                    refreshCode: refreshCode
                  }
                });
                common.get('token')['accessCode'] = accessCode;
                common.get('token')['refreshCode'] = refreshCode;

                // Updates user info and cookie
                SessionsHelper.setCurrentUser();

                // TODO: Need to refactor this.
                // Include token header every ajax request sent
                SessionsHelper.setAjaxHeader({
                  accessCode: accessCode
                });

                Backbone.history.navigate('#/links', true);

                new AlertView({
                  alert: {
                    message: 'Signed in successfully!',
                    style: 'success',
                    displayOn: '#/links'
                  }
                });
              }
            }
          }, 500);

    }
  });

  return PageRootSignInView;
});
