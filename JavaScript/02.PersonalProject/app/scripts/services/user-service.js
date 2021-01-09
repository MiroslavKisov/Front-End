const userService = (() => {
    function isAuth() {
      return sessionStorage.getItem(constants.session.authtoken) !== null;
    }
    
    function isCreator(currentUserId, creatorId) {
      return currentUserId === creatorId;
    }

    function saveSession(res) {
      sessionStorage.setItem(constants.session.username, res.username);
      sessionStorage.setItem(constants.session.authtoken, res._kmd.authtoken);
      sessionStorage.setItem(constants.session.userId, res._id);
    }
  
    function register(user) {
      return dataService.post(constants.collection.user, '', user, constants.authorization.basic);
    }
    
    function login(username, password) {
      return dataService.post(constants.collection.user, 'login', {username, password}, constants.authorization.basic);
    }

    function logout() {
      return dataService.post(constants.collection.user, '_logout', '', constants.authorization.kinvey);
    }

    function getUserData() {
      return dataService.get(constants.collection.user, '_me', constants.authorization.kinvey);
    }

    function updateProfile(data, userId) {
      return dataService.put(constants.collection.user, userId, data, constants.authorization.kinvey);
    }

    return {
      register,
      login,
      logout,
      saveSession,
      isAuth,
      isCreator,
      getUserData,
      updateProfile,
    }
  })();