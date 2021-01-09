import * as actionTypes from './actionTypes';
import { NotificationManager } from 'react-notifications';
import * as constants from '../../constants/constants';
import * as Kinvey from 'kinvey-html5-sdk';

var users = Kinvey.DataStore.collection('users', Kinvey.DataStoreType.Network);

//Sets the loading property to true when the API call begins
export const loadStart = () => {
  return {
    type: actionTypes.LOAD_START_USERS,
    loading: true
  }
}

//Sets the loading property to false when the API call ends
export const loadEnd = () => {
  return {
    type: actionTypes.LOAD_END_USERS,
    loading: false
  }
}

//Resets the redirect path to null
export const resetRedirectPath = () => {
  return {
    type: actionTypes.RESET_REDIRECT_PATH_USERS,
    redirectPath: null,
  }
}

//Executes on successful registration.
export const registerSuccess = (token, userId, username) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    token: token,
    userId: userId,
    username: username,
    isAuthenticated: true,
    redirectPath: '/',
  }
}

//Executes on registration error.
export const registerError = () => {
  return {
    type: actionTypes.REGISTER_ERROR,
    isAuthenticated: false,
  }
}

//Registers a new user and adds new user the the 'users' mirror collection.
export const register = (username, password) => {
  return dispatch => {

    dispatch(loadStart());

    new Kinvey.User.signup({
      username: username, 
      password: password,
      profilePic: '',
      bgPicture: '',
      normalized: username.toLowerCase()
    })
    .then((response) => {
        sessionStorage.setItem('token', response.data._kmd.authtoken);
        sessionStorage.setItem('userId', response.data._id);
        sessionStorage.setItem('username', response.data.username);

        dispatch(registerSuccess(
          response.data._kmd.authtoken, 
          response.data._id, 
          response.data.username));
        
        dispatch(loadEnd());

        NotificationManager
          .success(
            constants.messages.registerSuccess.msg, 
            constants.messages.registerSuccess.title, 
            constants.numerics.msgTimeout
          );
          users.save({
            username: username, 
            profilePic: '',
            bgPicture: '',
            normalized: username.toLowerCase()
          }).then((entity) => {
            
          }).catch((error) => {
            dispatch(registerError());
            dispatch(loadEnd());
            NotificationManager
              .error(
                error.message,
                constants.messages.error.title,
                constants.numerics.msgTimeout
              );
          });
      })
      .catch((error) => {
        dispatch(registerError());
        dispatch(loadEnd());
        NotificationManager
          .error(
            error.message,
            constants.messages.error.title,
            constants.numerics.msgTimeout
        );
      });
  }
}

//Executes on successful login.
export const loginSuccess = (token, userId, username, profilePic, bgPicture) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    userId: userId,
    username: username,
    isAuthenticated: true,
    redirectPath: '/',
    profilePic: profilePic,
    bgPicture: bgPicture
  }
}

//Executes on login error.
export const loginError = () => {
  return {
    type: actionTypes.LOGIN_ERROR,
    isAuthenticated: false,
  }
}

//Signs in an existing user.
export const login = (username, password) => {
  return dispatch => {

    dispatch(loadStart());

    Kinvey.User.login(username, password)
      .then((response) => {

      sessionStorage.setItem('token', response.data._kmd.authtoken);
      sessionStorage.setItem('userId', response.data._id);
      sessionStorage.setItem('username', response.data.username);
      sessionStorage.setItem('profilePic', response.data.profilePic);
      sessionStorage.setItem('bgPicture', response.data.bgPicture);

      dispatch(loginSuccess(
        response.data._kmd.authtoken, 
        response.data._id, 
        response.data.username,
        response.data.profilePic,
        response.data.bgPicture));
      
      dispatch(loadEnd());

      NotificationManager
        .success(
          constants.messages.loginSuccess.msg, 
          constants.messages.loginSuccess.title, 
          constants.numerics.msgTimeout
        );
    })
    .catch((error) => {
      dispatch(loginError());
      dispatch(loadEnd());
      NotificationManager
        .error(
          error.message,
          constants.messages.error.title,
          constants.numerics.msgTimeout
      );
    });
  }
}

//Executes on successful logout.
export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    token: null,
    userId: null,
    username: null,
    isAuthenticated: false,
    redirectPath: '/',
    profilePic: null,
    bgPicture: null
  }
}

//Executes on logout error.
export const logoutError = () => {
  return {
    type: actionTypes.LOGOUT_ERROR,
    isAuthenticated: true,
  }
}

//Signs out the active user.
export const logout = () => {
  return dispatch => {
    Kinvey.User.logout()
      .then((res) => {
      sessionStorage.clear();
      dispatch(logoutSuccess())
      NotificationManager
      .success(
        constants.messages.logoutSuccess.msg,
        constants.messages.logoutSuccess.title,
        constants.numerics.msgTimeout
      );
    })
    .catch((error) => {
      dispatch(logoutError());
      NotificationManager
        .error(
          error.message,
          constants.messages.error.title,
          constants.numerics.msgTimeout
      );
    });
  }
}

//Executes on get active user success.
export const getActiveUserSuccess = (userId, username, profilePic, bgPicture) => {
  return {
    type: actionTypes.GET_ACTIVE_USER_SUCCESS,
    userId: userId,
    username: username,
    profilePic: profilePic,
    bgPicture: bgPicture,
  }
}

//Executes on get active user error.
export const getActiveUserError = () => {
  return {
    type: actionTypes.GET_ACTIVE_USER_ERROR
  }
}

//Gets the active user
export const getActiveUser = () => {
  return dispatch => {

    dispatch(loadStart());

    var activeUser = Kinvey.User.getActiveUser();
    var promise = Promise.resolve(activeUser);
    if (activeUser !== null) {
      promise = activeUser.me();
    }
    promise
      .then((userRes) => {
        const user = userRes.data;
        dispatch(getActiveUserSuccess(user._id, user.username, user.profilePic, user.bgPicture));
        dispatch(loadEnd());
      })
      .catch((error) => {
        dispatch(getActiveUserError());
        dispatch(loadEnd());
        NotificationManager
          .error(
            error.message,
            constants.messages.error.title,
            constants.numerics.msgTimeout
        );
    });
  }
}

//Executes on uploading the profile picture successfully.
export const uploadProfilePicSuccess = (downloadURL) => {
  return {
    type: actionTypes.UPLOAD_PROFILE_PIC_SUCCESS,
    redirectPath: '/active-user',
    profilePic: downloadURL,
  }
}

//Executes on failing to upload the profile picture.
export const uploadProfilePicError = () => {
  return {
    type: actionTypes.UPLOAD_PROFILE_PIC_ERROR,
    redirectPath: null,
    profilePic: null,
  }
}

//Uploads the active user's profile picture.
export const uploadProfilePic = (userId, file, fileName, fileType) => {
  return dispatch => {
    var metadata ={
      filename: fileName,
      mimeType: fileType,
      public: 'true'
    };
    
    dispatch(loadStart());

    Kinvey.Files.upload(file, metadata)
      .then((fileRes) => {
        Kinvey.Files.stream(fileRes._id)
          .then((file) => {
            var url = file._downloadURL;

            Kinvey.User.update({
              'profilePic': url
            })
            .then((user) => {
              dispatch(uploadProfilePicSuccess(url));
              dispatch(loadEnd());
              sessionStorage.setItem('profilePic', url);
              
              NotificationManager
              .success(
                constants.messages.uploadProfilePic.msg,
                constants.messages.uploadProfilePic.title,
                constants.numerics.msgTimeout
                );
                
              
              var query = new Kinvey.Query();
              query.equalTo('_acl.creator', userId);
              var stream = users.find(query);
              stream.subscribe((entities) => {
                
                const user = entities[0];

                users.save({
                  _id: user._id,
                  username: user.username,
                  profilePic: url,
                  bgPicture: user.bgPicture,
                  normalized: user.normalized,
                }).then((entity) => {
                  
                }).catch((error) => {
                  dispatch(loadEnd());
                  NotificationManager
                  .error(
                    error.message,
                    constants.messages.error.title,
                    constants.numerics.msgTimeout
                  );
                });
              }, (error) => {
                dispatch(loadEnd());
                NotificationManager
                .error(
                  error.message,
                  constants.messages.error.title,
                  constants.numerics.msgTimeout
                );
              });
            })
            .catch((error) => {
              dispatch(uploadProfilePicError());
              dispatch(loadEnd());
              NotificationManager
              .error(
                error.message,
                constants.messages.error.title,
                constants.numerics.msgTimeout
              );
            });
          })
          .catch((error) => {
            dispatch(uploadProfilePicError());
            dispatch(loadEnd());
            NotificationManager
              .error(
                error.message,
                constants.messages.error.title,
                constants.numerics.msgTimeout
              );
          });
      })
      .catch((error) => {
        dispatch(uploadProfilePicError());
        dispatch(loadEnd());
        NotificationManager
        .error(
          error.message,
          constants.messages.error.title,
          constants.numerics.msgTimeout
        );
      });
  }
}

//Executes on uploading the background picture successfully.
export const uploadBgPicSuccess = (downloadURL) => {
  return {
    type: actionTypes.UPLOAD_BG_PICTURE_SUCCESS,
    redirectPath: '/active-user',
    bgPicture: downloadURL,
  }
}

//Executes on failing to upload the background picture.
export const uploadBgPicError = () => {
  return {
    type: actionTypes.UPLOAD_BG_PICTURE_ERROR,
    redirectPath: null,
    bgPicture: null,
  }
}

//Uploads the active user'b background picture.
export const uploadBackgroudPic = (userId, file, fileName, fileType) => {
  return dispatch => {
    var metadata ={
      filename: fileName,
      mimeType: fileType,
      public: 'true'
    };
    
    dispatch(loadStart());

    Kinvey.Files.upload(file, metadata)
      .then((fileRes) => {
        Kinvey.Files.stream(fileRes._id)
          .then((file) => {
            var url = file._downloadURL;

            Kinvey.User.update({
              'bgPicture': url
            })
            .then((user) => {
              dispatch(uploadBgPicSuccess(url));
              dispatch(loadEnd());
              sessionStorage.setItem('bgPicture', url);

              NotificationManager
              .success(
                constants.messages.uploadBgPic.msg,
                constants.messages.uploadBgPic.title,
                constants.numerics.msgTimeout
              );

              var query = new Kinvey.Query();
              query.equalTo('_acl.creator', userId);
              var stream = users.find(query);
              stream.subscribe((entities) => {
                
                const user = entities[0];

                users.save({
                  _id: user._id,
                  username: user.username,
                  profilePic: user.profilePic,
                  bgPicture: url,
                  normalized: user.normalized
                }).then((entity) => {
                  
                }).catch((error) => {
                  dispatch(loadEnd());
                  NotificationManager
                  .error(
                    error.message,
                    constants.messages.error.title,
                    constants.numerics.msgTimeout
                  );
                });
              }, (error) => {
                dispatch(loadEnd());
                NotificationManager
                .error(
                  error.message,
                  constants.messages.error.title,
                  constants.numerics.msgTimeout
                );
              });
            })
            .catch((error) => {
              dispatch(uploadBgPicError());
              dispatch(loadEnd());
              NotificationManager
              .error(
                error.message,
                constants.messages.error.title,
                constants.numerics.msgTimeout
              );
            });
          })
          .catch((error) => {
            dispatch(uploadBgPicError());
            dispatch(loadEnd());
            NotificationManager
              .error(
                error.message,
                constants.messages.error.title,
                constants.numerics.msgTimeout
              );
          });
      })
      .catch((error) => {
        dispatch(uploadBgPicError());
        dispatch(loadEnd());
        NotificationManager
        .error(
          error.message,
          constants.messages.error.title,
          constants.numerics.msgTimeout
        );
      });
  }
}

//Executes on updating the active user's username
export const updateUsernameSuccess = (username) => {
  return {
    type: actionTypes.UPDATE_USERNAME_SUCCESS,
    username: username,
    redirectPath: '/active-user'
  }
}

//Executes on failing to update the active user's username.
export const updateUsernameError = () => {
  return {
    type: actionTypes.UPDATE_USERNAME_ERROR,
    username: null,
    redirectPath: null
  }
}

//Updates the active user's username.
export const updateUsername = (userId, username) => {
  return dispatch => {

    dispatch(loadStart());

    Kinvey.User.update({
      'username': username,
      'normalized': username.toLowerCase()
    })
    .then((user) => {
      dispatch(updateUsernameSuccess(username));
      dispatch(loadEnd());
      sessionStorage.setItem('username', username);
  
      NotificationManager.success(
        constants.messages.editUsername.msg,
        constants.messages.editUsername.title,
        constants.numerics.msgTimeout
      );
      
      var query = new Kinvey.Query();
      query.equalTo('_acl.creator', userId);
      var stream = users.find(query);
      stream.subscribe((entities) => {
        
          const user = entities[0];
          users.save({
            _id: user._id,
            username: username,
            profilePic: user.profilePic,
            bgPicture: user.bgPicture,
            normalized: username.toLowerCase()
          }).then((entity) => {
  
          }).catch((error) => {
            dispatch(loadEnd());
            NotificationManager
            .error(
              error.message,
              constants.messages.error.title,
              constants.numerics.msgTimeout
            );
          });
  
      }, (error) => {
        dispatch(loadEnd());
        NotificationManager
        .error(
          error.message,
          constants.messages.error.title,
          constants.numerics.msgTimeout
        );
      });
    })
    .catch((error) => {
      dispatch(loadEnd());
      NotificationManager
      .error(
        error.message,
        constants.messages.error.title,
        constants.numerics.msgTimeout
      );
    });
  }
}

//Executes when the search call is successful.
export const searchUsersSuccess = (users, skip) => {
  return {
    type: actionTypes.SEARCH_USERS_SUCCESS,
    users: users,
    arrowBackward: skip > 0,
    arrowForward: users.length >= constants.numerics.pageUsersLen
  }
}

//Executes when the search call fails.
export const searchUsersError = () => {
  return {
    type: actionTypes.SEARCH_USERS_ERROR,
    users: [],
    arrowBackward: false,
    arrowForward: true
  }
}

//Searches in the users mirror collection depending on searchValue parameter, also sorts depending
//on sort parameter and creates pagination depending on skip parameter.
export const searchUsers = (searchValue, skip, sort) => {
  return dispatch => {

    dispatch(loadStart());

    var query = new Kinvey.Query();
    query.notEqualTo('_acl.creator', sessionStorage.getItem('userId'));

    query.limit = constants.numerics.pageUsersLen;

    if(skip) {
      query.skip = skip;
    }

    if(searchValue) {
      var s = searchValue.toLowerCase();
      query.matches('normalized', `^${s}`);
    }

    if(sort) {
      if(sort === constants.sort.ascending) {
        query.ascending('username');
      } else if(sort === constants.sort.descending) {
        query.descending('username');
      }
    }
    
    users.find(query)
    .subscribe((users) => {

      dispatch(searchUsersSuccess(users, skip));
      dispatch(loadEnd());

    },(error) => {
      dispatch(loadEnd());
      dispatch(searchUsersError());
      NotificationManager
      .error(
        error.message,
        constants.messages.error.title,
        constants.numerics.msgTimeout
      );
    });
  }
}




