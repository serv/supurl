/*global define*/

define([
  'underscore',
  'backbone',
  'userModel'
], function (_, Backbone, User) {
  'use strict';

  var instance;

  var Common = Backbone.Model.extend({

    initialize: function() {
    },

    defaults: {
      currentUser: new User(),
      token: {}
    },

  });

  Common.getInstance = function() {

    if (!instance) {
      instance = new Common();
    }
    return instance;
  };

  return Common;

});
