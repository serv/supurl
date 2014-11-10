/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'common',
  'sessionsHelper',
  'alertView'
], function ($, _, Backbone, JST, common, SessionsHelper, AlertView) {
  'use strict';

  var PageSettingsPasswordView = Backbone.View.extend({
    template: JST['app/scripts/templates/page_settings_password.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.settings-page',

    events: {
      'click .e-settings-password-submit': 'onSubmit'
    },

    initialize: function () {
      this.render();
    },

    render: function () {
      var data = {};
      _.extend(data, SessionsHelper);
      this.$el.html(this.template(data));
    },

    onSubmit: function(e) {
      e.preventDefault();
      this.disabledSubmit(true);

      var self = this,
          user,
          options,
          commonCookie = $.cookie('common'),
          commonHash = {};

      user = {
        current_password: $('.val-settings-password-old').val(),
        password: $('.val-settings-password-new').val(),
        password_confirmation: $('.val-settings-password-new-confirmation').val()
      };
      window.common.currentUser.url = 'http://localhost:3000/api/v0/users/'
                                    + window.common.currentUser.id
                                    + '/password';

      options = {
        success: function() {
          commonHash = JSON.parse(commonCookie);
          commonHash.currentUser.email = user.email;
          $.cookie('common', JSON.stringify(commonHash));

          new AlertView({
            alert: {
              message: 'Updated the password sucessfully',
              style: 'success',
              displayOn: '#/settings/password',
              customEl: '#settings-alert'
            }
          });
          self.disabledSubmit(false);
        },
        error: function(model, response) {
          window.rrresponse = response;
          self.disabledSubmit(false);
          self.showErrors({
            response: response
          });
        }
      };

      window.common.currentUser.save(user, options);
    },

    disabledSubmit: function(state) {
      var selector = '.btn.btn-primary';
      this.$(selector).toggleClass('disabled', state);
    },

    showErrors: function(options) {
      var self = this,
          messages = [],
          model = window.common.currentUser;

      if (_.isEmpty(options.response.responseJSON)) {
        _.each(model.errors, function(error) {

          if (error.name === 'email') {
            messages.push(error);
          }
        });
      } else {
        messages.push(options.response.responseJSON);
      }

      new AlertView({
        alert: {
          message: messages,
          style: 'danger',
          displayOn: '#/settings/password',
          customEl: '#settings-alert'
        }
      });
    }
  });

  return PageSettingsPasswordView;
});