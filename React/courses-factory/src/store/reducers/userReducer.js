import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  username: null,
  isAuthenticated: false,
  redirectPath: null,
  profilePic: null,
  bgPicture: null,
  loading: false,
  arrowForward: true,
  arrowBackward: false,
  users: []
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOAD_START_USERS: 
      return{
        ...state,
        loading: action.loading
      }
    
    case actionTypes.LOAD_END_USERS:
      return {
        ...state,
        loading: action.loading
      }

    case actionTypes.RESET_REDIRECT_PATH_USERS: 
      return {
        ...state,
        redirectPath: action.redirectPath,
      }

    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        username: action.username,
        isAuthenticated: action.isAuthenticated,
        redirectPath: action.redirectPath,
      }

    case actionTypes.REGISTER_ERROR:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      }
    
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        username: action.username,
        isAuthenticated: action.isAuthenticated,
        redirectPath: action.redirectPath,
        profilePic: action.profilePic,
        bgPicture: action.bgPicture
      }
    
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      }
    
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        username: action.username,
        isAuthenticated: action.isAuthenticated,
        redirectPath: action.redirectPath,
        profilePic: action.profilePic,
        bgPicture: action.bgPicture
      }
    
    case actionTypes.LOGOUT_ERROR: 
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      }
    
    case actionTypes.GET_ACTIVE_USER_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        username: action.username,
        profilePic: action.profilePic,
        bgPicture: action.bgPicture
      }

    case actionTypes.GET_ACTIVE_USER_ERROR: 
      return state;
      
    case actionTypes.UPLOAD_PROFILE_PIC_SUCCESS:
      return {
        ...state,
        redirectPath: action.redirectPath,
        profilePic: action.profilePic,
      }
    
    case actionTypes.UPLOAD_PROFILE_PIC_ERROR:
      return {
        ...state,
        redirectPath: action.redirectPath,
        profilePic: action.profilePic,
      }  
    
    case actionTypes.UPLOAD_BG_PICTURE_SUCCESS: 
      return {
        ...state,
        redirectPath: action.redirectPath,
        bgPicture: action.bgPicture,
      }
    
    case actionTypes.UPLOAD_BG_PICTURE_ERROR:
      return {
        ...state,
        redirectPath: action.redirectPath,
        bgPicture: action.bgPicture,
      }

    case actionTypes.UPDATE_USERNAME_SUCCESS: 
      return {
        ...state,
        redirectPath: action.redirectPath,
        username: action.username
      }
    
    case actionTypes.UPDATE_USERNAME_ERROR:
      return {
        ...state,
        redirectPath: action.redirectPath,
        username: action.username,
      }
    
    case actionTypes.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        users: [
          ...action.users
        ],
        arrowForward: action.arrowForward,
        arrowBackward: action.arrowBackward
      }  
    
    case actionTypes.SEARCH_USERS_ERROR:
      return {
        ...state,
        users: [
          ...action.users
        ],
        arrowForward: action.arrowForward,
        arrowBackward: action.arrowBackward
      } 
    
    default: 
      return state;
  }
}

export default userReducer;