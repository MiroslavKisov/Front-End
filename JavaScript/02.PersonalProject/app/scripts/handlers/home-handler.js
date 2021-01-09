//Handles the home page route
handlers.getHome = function (context) {
    context.isAuth = userService.isAuth;
    context.username = sessionStorage.getItem(constants.session.username);
  
    context.loadPartials({
      header: constants.templates.headerPath,
      footer: constants.templates.footerPath
    }).then(function () {
      this.partial(constants.templates.homePath);
    }).catch(function (error) {
      notificationService.error(error);
    });
  }