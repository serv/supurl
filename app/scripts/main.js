/*global require*/
'use strict';

require.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    underscore: {
      exports: '_'
    },
    underscoreString: {
      deps: ['underscore']
    }
  },
  paths: {
    jquery:       '../bower_components/jquery/dist/jquery',
    backbone:     '../bower_components/backbone/backbone',
    underscore:   '../bower_components/lodash/dist/lodash',
    bootstrap:    '../bower_components/sass-bootstrap/dist/js/bootstrap',
    typeahead:    '../bower_components/typeahead.js/dist/typeahead.bundle',
    tokenfield:   '../bower_components/bootstrap-tokenfield/dist/bootstrap-tokenfield',
    jqueryCookie: '../bower_components/jquery-cookie/jquery.cookie',
    underscoreString: '../bower_components/underscore.string/dist/underscore.string.min',

    app:                                  'models/app',
    common:                               'globals/common',
    sessionsHelper:                       'helpers/sessions_helper',
    layoutNavigationView:                 'views/layout_navigation',
    layoutNavigationCogwheelDropdownView: 'views/layout_navigation_cogwheel_dropdown',
    layoutNavigationSearchBarView:        'views/layout_navigation_search_bar',
    alertModel:                           'models/alert',
    alertView:                            'views/alert',

    pageRouter:                  'routes/page',
    pageAboutView:               'views/page_about',
    pageHelpView:                'views/page_help',
    pageSettingsView:            'views/page_settings',
    pageSettingsAccountView:     'views/page_settings_account',
    pageSettingsPasswordView:    'views/page_settings_password',
    pageSettingsPreferencesView: 'views/page_settings_preferences',
    pageRootView:                'views/page_root',
    pageRootSignUpView:          'views/page_root_sign_up',
    pageRootSignInView:          'views/page_root_sign_in',
    pageSearchView:              'views/page_search',

    linkRouter:       'routes/link',
    linkModel:        'models/link',
    newLinkView:      'views/link_new',
    editLinkView:     'views/link_edit',
    showLinkView:     'views/link_show',
    links:            'collections/links',
    linksView:        'views/links',
    linksMessageView: 'views/links_message',

    tagRouter:        'routes/tag',
    tags:             'collections/tags',
    tagModel:         'models/tag',
    showTagView:      'views/tag_show',

    userModel:        'models/user',

    sessionModel:     'models/session',

    authRouter:       'routes/auth',
    callbackAuthView: 'views/auth_callback'
  }
});

require([
  'backbone',
  'bootstrap',
  'jqueryCookie',
  'underscoreString',
  'pageRouter',
  'linkRouter',
  'tagRouter',
  'authRouter',
  'layoutNavigationView',
  'app'
], function (Backbone,
             Bootstrap,
             JQueryCookie,
             UnderscoreString,
             PageRouter,
             LinkRouter,
             TagRouter,
             AuthRouter,
             LayoutNavigationView,
             App) {
  var app = new App(),
      layoutNavigationView = new LayoutNavigationView(),
      pageRouter = new PageRouter(),
      linkRouter = new LinkRouter(),
      tagRouter = new TagRouter(),
      authRouter = new AuthRouter();

  // Empty nav search bar when you leave the search page
  pageRouter.on("route", function(route, params) {
    if (route !== 'search') {
      $('.search.typeahead').val('');
    }
  });
  linkRouter.on("route", function(route, params) {
    if (route !== 'search') {
      $('.search.typeahead').val('');
    }
  });
  tagRouter.on("route", function(route, params) {
    if (route !== 'search') {
      $('.search.typeahead').val('');
    }
  });

  Backbone.history.start();
});
