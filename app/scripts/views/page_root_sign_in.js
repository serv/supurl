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
      var signInUrl = 'http://localhost:3000/v0/auth/sign_in'
                    + '?api_key=key&redirect_uri=%23/auth/callback'
                    + '&method=implicit',
          options = 'height=500,width=400',
          popUp = window.open(signInUrl, 'Sign in using Supurl acount', options),

          oauthInterval = window.setInterval(function() {
            if (popUp.closed) {
              console.log($.cookie('authTokenSupurl'));
              console.log('Detect popup closed');
              window.clearInterval(oauthInterval);
            }
          }, 500);

    }
  });

  return PageRootSignInView;
});
