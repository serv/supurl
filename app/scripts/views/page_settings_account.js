/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'common',
  'sessionsHelper',
  'alertView'
], function ($, _, Backbone, JST, Common, SessionsHelper, AlertView) {
  'use strict';

  var PageSettingsAccountView = Backbone.View.extend({
    template: JST['app/scripts/templates/page_settings_account.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '.settings-page',

    events: {
      'click .e-settings-account-submit': 'onSubmit'
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
          common = Common.getInstance(),
          currentUser = common.get('currentUser');

      user = {
        email: $('.val-settings-account-email').val()
      };

      currentUser.url = 'http://localhost:3000/api/v0/users/'
                      + currentUser.id
                      + '/account';

      options = {
        success: function() {
          currentUser.set({'email': user.email});

          new AlertView({
            alert: {
              message: 'Updated the email',
              style: 'success',
              displayOn: '#/settings',
              customEl: '#settings-alert'
            }
          });
          self.disabledSubmit(false);
        },
        error: function() {
          self.disabledSubmit(false);
          self.showErrors();
        }
      };

      currentUser.save(user, options);
    },

    disabledSubmit: function(state) {
      var selector = '.btn.btn-primary';
      this.$(selector).toggleClass('disabled', state);
    },

    showErrors: function() {
      var self = this,
          messages = [],
          common = Common.getInstance(),
          model = common.get('currentUser');

      _.each(model.errors, function(error) {

        // TODO: making sure that only email error gets displayed
        // TODO: when rails error is fixed, remove this conditional
        // TODO: https://github.com/rails/rails/issues/17364
        if (error.name === 'email') {
          messages.push(error);
        }
      });

      new AlertView({
        alert: {
          message: messages,
          style: 'danger',
          displayOn: '#/settings',
          customEl: '#settings-alert'
        }
      });
    }

  });

  return PageSettingsAccountView;
});
