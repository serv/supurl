require([
  'jquery',
  'underscore',
  'userModel'
], function ($, _, User) {
  var common = {},
      commonCookie = $.cookie('common'),
      token;

  if (_.isEmpty(commonCookie)) {
    common['currentUser'] = new User();
  } else {
    common = JSON.parse(commonCookie);
    common.currentUser = new User(common.currentUser);

    // Include token header every ajax request sent
    $(document).ajaxSend(function(event, request, settings) {
       token = common.currentUser.get('token').accessCode;
       if (token) {
          request.setRequestHeader("token", token);
       }
    });
  }

  window['common'] = common;
});
