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
          commonCookie = $.cookie('common'),
          commonHash = {};

      user = {
        email: $('.val-settings-account-email').val()
      };
      window.common.currentUser.url = 'http://localhost:3000/api/v0/users/'
                                    + window.common.currentUser.id
                                    + '/account';

      options = {
        success: function() {
          commonHash = JSON.parse(commonCookie);
          commonHash.currentUser.email = user.email;
          $.cookie('common', JSON.stringify(commonHash));

          new AlertView({
            alert: {
              message: 'Updated the email',
              style: 'success',
              displayOn: '#/settings',
              customEl: '#settings-alert'
            }
          });
        },
        error: function() {
          self.disabledSubmit(false);
        }
      };

      window.common.currentUser.save(user, options);
    },

    disabledSubmit: function(state) {
      var selector = '.btn.btn-primary';
      this.$(selector).toggleClass('disabled', state);
    }

  });

  return PageSettingsAccountView;
});
