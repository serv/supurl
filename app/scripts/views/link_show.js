/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'linkModel'
], function ($, _, Backbone, JST, Link) {
  'use strict';

  var LinkShowView = Backbone.View.extend({
    template: JST['app/scripts/templates/link_show.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#main',

    events: {},

    initialize: function (attr) {
      console.log(attr);

      var modelAttr,
          model;
      modelAttr = {
        id: attr['id'],
        url: 'www.daum.net'
      };

      model = new Link();
      model.set(modelAttr);
      this.model = model;

      console.log('this model', this.model.get('url'));
      console.log('this template', this.template());
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      // this.$el.html(this.template(this.model.toJSON()));
      this.$el.html(this.template(this.model));
    }
  });

  return LinkShowView;
});
