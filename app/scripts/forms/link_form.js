/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'backboneForms'
], function ($, _, Backbone, JST, Link, Form) {
  'use strict';

  var LinkForm = Backbone.Form.extend({
    template: JST['app/scripts/templates/link_form.ejs'],

    schema: function() {
      var schema,
          schemaAttributeTemplate = this.schemaAttributeTemplate;

      schema = {
        title: schemaAttributeTemplate('Title'),
        url: schemaAttributeTemplate('URL'),
        tags: schemaAttributeTemplate('Tags'),
        suggestedTags: schemaAttributeTemplate('Suggested tags'),
        comments: schemaAttributeTemplate('Comments')
      }

      return schema;
    },

    // schema helper function for getting template key-value pair
    schemaAttributeTemplate: function(attr) {
      var attributeTemplate = function(attr) {
        var templateContent = '<div class="form-group">'
                            + '<input type="text" class="form-control"'
                            + ' id="inputTitle" placeholder="'
                            + attr
                            + '"></div>';

        return _.template(templateContent);
      };

      return { template: attributeTemplate(attr) };
    }


  });

  return LinkForm;
});
