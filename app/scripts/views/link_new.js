/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'linkModel'
], function ($, _, Backbone, JST, Link) {
    'use strict';

    var LinksNewView = Backbone.View.extend({
        template: JST['app/scripts/templates/link_new.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        el: '#main',

        events: {},

        initialize: function () {
            this.model = new Link();
            this.model.url = 'google.com';
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function () {
            // this.$el.html(this.template(this.model.toJSON()));
            this.$el.html(this.template(this.model));
        }
    });

    return LinksNewView;
});
