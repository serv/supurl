require([
  'jquery',
  'underscore',
  'userModel'
], function ($, _, User) {
  var common = {},
      commonCookie = $.cookie('common');

  if (_.isEmpty(commonCookie)) {
    common['currentUser'] = new User();
  } else {
    common = JSON.parse(commonCookie);
    common.currentUser = new User(common.currentUser);
  }

  window['common'] = common;
});
