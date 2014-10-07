/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'alertModel'
], function ($, _, Backbone, JST, Alert) {
  'use strict';

  var AlertView = Backbone.View.extend({
    template: JST['app/scripts/templates/alert.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#alert',

    events: {
      // 'route': 'deleteModel'
    },

    initialize: function (options) {
      var self = this;

      this.model = new Alert({
        message: options.alert.message,
        style: options.alert.style,
        displayOn: self.emptyHashUri(options.alert.displayOn)
      })
      // this.listenTo(this.model, 'change', this.render);

      this.render();
      this.listenTo(this.model, 'destroy', this.remove);

      $(window).bind('hashchange', function() {
        if (window.location.hash !== self.model.get('displayOn')) {
          self.model.destroy();
        }
      });
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    },

    emptyHashUri: function(uri) {
      if (uri === '#') {
        return '';
      } else {
        return uri;
      }
    }
  });

  return AlertView;
});
