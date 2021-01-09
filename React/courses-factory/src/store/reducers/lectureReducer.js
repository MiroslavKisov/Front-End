import * as actionTypes from '../actions/actionTypes';

const initialState = {
  name: null,
  description: null,
  courseId: null,
  video: null,
  lectures: [],
  redirectPath: null,
  arrowForward: true,
  arrowBackward: false,
  isCreator: null,
  loading: false
}

const lectureReducer = (state = initialState, action) => {
  switch(action.type) {
    
    case actionTypes.LOAD_START_LECT: 
      return {
        ...state,
        loading: action.loading
      }
    
    case actionTypes.LOAD_END_LECT: 
      return {
        ...state,
        loading: action.loading
      }
    
    case actionTypes.RESET_REDIRECT_PATH_LECT: 
      return {
        ...state,
        redirectPath: action.redirectPath
      }
    
    case actionTypes.ADD_LECTURE_SUCCESS: 
      return {
        ...state,
        name: action.name,
        description: action.description,
        courseId: action.courseId,
        video: action.video,
        redirectPath: action.redirectPath,
      }
    
    case actionTypes.ADD_LECTURE_ERROR: 
    return {
      ...state,
      name: action.name,
      description: action.description,
      courseId: action.courseId,
      video: action.video,
      redirectPath: action.redirectPath,
    }
    
    case actionTypes.GET_LECTURE_BY_ID_SUCCESS: 
      return {
        ...state,
        name: action.name,
        description: action.description,
        video: action.video,
        isCreator: action.isCreator
      }
    
    case actionTypes.GET_LECTURE_BY_ID_ERROR: 
      return {
        ...state,
        name: action.name,
        description: action.description,
        video: action.video,
        isCreator: action.isCreator
      }  
    
    case actionTypes.UPLOAD_VIDEO_SUCCESS: 
      return {
        ...state,
        video: action.video
      }
    
    case actionTypes.UPLOAD_VIDEO_ERROR: 
      return {
        ...state,
        video: action.video
      }
    
    case actionTypes.GET_LECTURES_SUCCESS:
      return {
        ...state,
        lectures: [
          ...action.lectures
        ],
        arrowForward: action.arrowForward,
        arrowBackward: action.arrowBackward
      }
    
    case actionTypes.GET_LECTURES_ERROR:
      return {
        ...state,
        lectures: [
          ...action.lectures
        ],
        arrowForward: action.arrowForward,
        arrowBackward: action.arrowBackward
      }
    
    case actionTypes.EDIT_LECTURE_SUCCESS:
      return {
        ...state,
        redirectPath: action.redirectPath
      }
    
    case actionTypes.EDIT_LECTURE_ERROR:
      return {
        ...state,
        redirectPath: action.redirectPath
      }
    
    case actionTypes.DELETE_LECTURE_SUCCESS:
      return {
        ...state,
        redirectPath: action.redirectPath
      }
      
    case actionTypes.DELETE_LECTURE_ERROR:
      return {
        ...state,
        redirectPath: action.redirectPath
      }

    default: 
      return state;
  }
}

export default lectureReducer;