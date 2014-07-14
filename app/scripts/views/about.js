/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AboutView = Backbone.View.extend({
        template: JST['app/scripts/templates/about.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        el: '#main',

        events: {},

        initialize: function () {
            // this.listenTo(this.model, 'change', this.render);
            debugger;
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        }
    });

    return AboutView;
});
