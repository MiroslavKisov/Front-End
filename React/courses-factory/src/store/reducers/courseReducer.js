import * as actionTypes from '../actions/actionTypes';

const initialState = {
  name: null,
  description: null,
  redirectPath: null,
  loading: false,
  arrowForward: true,
  arrowBackward: false,
  creator: null,
  isCreator: null,
  courses:[]
}

const courseReducer = (state = initialState, action) => {
  switch(action.type) {
    
    case actionTypes.LOAD_START_COURSES: 
      return {
        ...state,
        loading: action.loading
      }
    
    case actionTypes.LOAD_END_COURSES:
        return {
          ...state,
          loading: action.loading
        }

    case actionTypes.RESET_REDIRECT_PATH_COURSES: 
      return {
        ...state,
        redirectPath: action.redirectPath
      }
    

    case actionTypes.CREATE_COURSE_SUCCESS:
      return {
        ...state,
        name: action.name,
        description: action.description,
        redirectPath: action.redirectPath,
      }

    case actionTypes.CREATE_COURSE_ERROR: 
      return {
        ...state,
        name: action.name,
        description: action.description,
        redirectPath: action.redirectPath,
      } 
    
    case actionTypes.GET_COURSE_BY_ID_SUCCESS:
      return {
        ...state,
        name: action.name,
        description: action.description,
        isCreator: action.isCreator,
        creator: action.creator
      }

    case actionTypes.GET_COURSE_BY_ID_ERROR: 
      return {
        ...state,
        name: action.name,
        description: action.description,
        isCreator: action.isCreator,
        creator: action.creator
      }
    
    case actionTypes.EDIT_COURSE_SUCCESS:
      return {
        ...state,
        redirectPath: action.redirectPath
      }
    
    case actionTypes.EDIT_COURSE_ERROR:
      return {
        ...state,
        redirectPath: action.redirectPath
      }

    case actionTypes.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        redirectPath: action.redirectPath
      }
    
    case actionTypes.DELETE_COURSE_ERROR:
      return {
        ...state,
        redirectPath: action.redirectPath
      }
    
    case actionTypes.GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: [
          ...action.courses
        ],
        arrowForward: action.arrowForward,
        arrowBackward: action.arrowBackward
      }
    
    case actionTypes.GET_COURSES_ERROR:
      return {
        ...state,
        courses: [
          ...action.courses
        ],
        arrowForward: action.arrowForward,
        arrowBackward: action.arrowBackward
      }

    default: 
      return state;
  }
}

export default courseReducer;