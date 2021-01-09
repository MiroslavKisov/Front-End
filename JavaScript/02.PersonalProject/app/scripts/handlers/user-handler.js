//Renders the register form
handlers.getRegister = function(context) {
  context.registerRoute = constants.routes.register;

  context.loadPartials({
      header: constants.templates.headerPath,
      footer: constants.templates.footerPath
    }).then(function () {
      this.partial(constants.templates.registerPath);
    }).catch(function (error) {
      notificationService.error(error);
    });
}

//Renders the login form
handlers.getLogin = function(context) {
  context.loginRoute = constants.routes.login;

  context.loadPartials({
      header: constants.templates.headerPath,
      footer: constants.templates.footerPath
    }).then(function () {
      this.partial(constants.templates.loginPath);
    }).catch(function (error) {
      notificationService.error(error);
    });
}

//Posts the register form data
handlers.postRegister = function(context) {
  let username = context.params.username;
  let password = context.params.password;
  let repeatPassword = context.params.repeatPassword;
  let aboutYou = context.params.aboutYou;

  let user = {
    username : username,
    password : password, 
    aboutYou : aboutYou,
  }

  userService.register(user)
  .then(function(res) {
    userService.saveSession(res.data);
    notificationService.success(constants.messages.successRegister);
    context.redirect(constants.routes.homeHashtag);
  })
  .catch(function(error) {
    notificationService.error(error);
  });
}

//Posts the login form data
handlers.postLogin = function(context) {
  let username = context.params.username;
  let password = context.params.password;

  userService.login(username, password)
    .then(function(res) {
      userService.saveSession(res.data);
      notificationService.success(constants.messages.successLogin);
      context.redirect(constants.routes.homeHashtag);
    })
    .catch(function(error) {
      notificationService.error(error);
    });
}

//Logs out the current user
handlers.logoutUser = function(context) {
  userService.logout()
   .then(function() {
     sessionStorage.clear();
     context.redirect(constants.routes.homeHashtag);
   })
   .catch(function(error) {
     notificationService.error(error);
   })
}

//Renders the user profile data
handlers.getProfile = function(context) {
  userService.getUserData()
    .then(function(userData) {
      context.username = userData.data.username;
      context.aboutYou = userData.data.aboutYou;
      context.picture = userData.data.picture;
      context.isAuth = userService.isAuth;
      context.username = sessionStorage.getItem(constants.session.username);
      context.editRoute = constants.routes.profileEdit;
      context.pictureEdit = constants.routes.profilePictureEdit;

      context.loadPartials({
        header : constants.templates.headerPath,
        footer : constants.templates.footerPath,
      })
      .then(function() {
        this.partial(constants.templates.profilePath);
      });

    })
    .catch(function(error) {
      notificationService.error(error)
    });
}

//Renders the user edit form
handlers.getProfileEdit = function(context) {
  userService.getUserData()
   .then(function(userData) {
    
    context.username = userData.data.username;
    context.aboutYou = userData.data.aboutYou;
    context.picture = userData.data.picture;
    context.isAuth = userService.isAuth;
    context.editRoute = constants.routes.profileEdit;

    context.loadPartials({
      header : constants.templates.headerPath,
      footer : constants.templates.footerPath
    })
    .then(function() {
      this.partial(constants.templates.profileEditPath);
    });

   })
   .catch(function(error) {
    notificationService.error(error)
  });
}

//Posts the user updateds data
handlers.postProfileEdit = function(context) {

  let userId = sessionStorage.getItem(constants.session.userId);
  let username = context.params.username;
  let newAboutYou = context.params.aboutYou;
  let picture = context.params.profilePicture;

  let user = {
    username : username,
    aboutYou : newAboutYou,
    picture : picture,
  }

  userService.updateProfile(user, userId)
    .then(function(response) {

      sessionStorage.clear();
      userService.saveSession(response.data);
      notificationService.success(constants.messages.successUpdateProfile);
      context.redirect(constants.routes.profile);
  })
  .catch(function(error) {
    notificationService.error(error);
  });
}

//Updates the user profile picture
handlers.editProfilePicture = function(context) {
  let pictureFile = document.getElementById(constants.selectors.profilePicture).files[0];

  if(pictureFile.size >= constants.fileSize.picture) {
    notificationService.error(constants.messages.errorPictureSize);
    return;
  }

  if(pictureFile.type !== constants.fileTypes.jpg &&
     pictureFile.type !== constants.fileTypes.jpeg &&
     pictureFile.type !== constants.fileTypes.png && 
     pictureFile.type !== constants.fileTypes.gif) {
      notificationService.error(constants.messages.errorPictureExtension);
      return;
    }

  pictureService.encodePicture(pictureFile)
    .then(function(data) {

      let picture = data;
      let userId = sessionStorage.getItem(constants.session.userId);

      userService.getUserData()
        .then(function(userData) {

          let aboutYou = userData.data.aboutYou;

          let user = {
            picture : picture,
            aboutYou : aboutYou,
          }
    
          userService.updateProfile(user, userId)
            .then(function(response) {
              sessionStorage.clear();
              userService.saveSession(response.data);
              notificationService.success(constants.messages.successUpdateProfile);
              context.redirect(constants.routes.profile);
            })
            .catch(function(error) {
              notificationService.error(error);
            });
        })
        .catch(function(error) {
          notificationService.error(error);
        });
    })
    .catch(function(error) {
      notificationService.error(error)
    });
}