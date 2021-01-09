import * as actionTypes from './actionTypes';
import { NotificationManager } from 'react-notifications';
import * as constants from '../../constants/constants';
import * as Kinvey from 'kinvey-html5-sdk';

var courses = Kinvey.DataStore.collection('courses', Kinvey.DataStoreType.Network);
var lectures = Kinvey.DataStore.collection('lectures', Kinvey.DataStoreType.Network);
var users = Kinvey.DataStore.collection('users', Kinvey.DataStoreType.Network);

//Sets the loading property to true when the API call begins
export const loadStart = () => {
  return {
    type: actionTypes.LOAD_START_COURSES,
    loading: true
  }
}

//Sets the loading property to false when the API call ends
export const loadEnd = () => {
  return {
    type: actionTypes.LOAD_END_COURSES,
    loading: false
  }
}

//Resets the redirect path to null
export const resetRedirectPath = () => {
  return {
    type: actionTypes.RESET_REDIRECT_PATH_COURSES,
    redirectPath: null,
  }
}

//Executes on create course success
export const createSuccess = (id, name, description) => {
  return {
    type: actionTypes.CREATE_COURSE_SUCCESS,
    name: name,
    description: description,
    redirectPath: '/courses/' + id,
  }
}

//Executes on create course error
export const createError = () => {
  return {
    type: actionTypes.CREATE_COURSE_ERROR,
    name: null,
    description: null,
    redirectPath: null,
  }
}

//Creates new course
export const createCourse = (name, description) => {
  return dispatch => {

    dispatch(loadStart());

    courses.save({
        name: name,
        description: description,
        normalized: name.toLowerCase(),
      })
      .then((res) => {
        dispatch(createSuccess(res._id, res.name, res.description));
        dispatch(loadEnd());
        NotificationManager
          .success(
            constants.messages.createCourse.msg,
            constants.messages.createCourse.title,
            constants.numerics.msgTimeout,
          );
      })
      .catch((error) => {
        dispatch(loadEnd());
        NotificationManager
          .error(
            error.message,
            constants.messages.error.title,
            constants.numerics.msgTimeout,
          );
      });
  }
}

//Executes on get course success
export const getCourseSuccess = (name, description, creatorId, username) => {
  return {
    type: actionTypes.GET_COURSE_BY_ID_SUCCESS,
    name: name,
    description: description,
    isCreator: creatorId === sessionStorage.getItem('userId'),
    creator: username
  }
}

//Executes on get course error
export const getCourseError = () => {
  return {
    type: actionTypes.GET_COURSE_BY_ID_ERROR,
    name: null,
    description: null,
    isCreator: null,
    creator: null
  }
}

//Gets a course by ID
export const getCourseById = (id) => {
  return dispatch => {

    dispatch(loadStart());

    courses.findById(id)
    .subscribe((course) => {
      const creatorId = course._acl.creator;
      sessionStorage.setItem('courseName', course.name);
      sessionStorage.setItem('courseDesc', course.description);

      var query = new Kinvey.Query();
      query.equalTo('_acl.creator', creatorId);

      users.find(query)
        .subscribe((users) => {
          dispatch(
            getCourseSuccess(
              course.name, 
              course.description,
              creatorId,
              users[0].username));
          dispatch(loadEnd());
        }, (error) => {
          dispatch(getCourseError());
          dispatch(loadEnd());
          NotificationManager
          .error(
            error.message,
            constants.messages.error.title,
            constants.numerics.msgTimeout,
          );
        });

    }, (error) => {

      dispatch(getCourseError());
      dispatch(loadEnd());
      NotificationManager
          .error(
            error.message,
            constants.messages.error.title,
            constants.numerics.msgTimeout,
          );
    });
  }
}

//Executes on edit course success
export const editCourseSuccess = (courseId) => {
  return {
    type: actionTypes.EDIT_COURSE_SUCCESS,
    redirectPath: "/courses/" + courseId,
  }
}

//Executes on edit course error
export const editCourseError = () => {
  return {
    type: actionTypes.EDIT_COURSE_ERROR,
    redirectPath: null
  }
}

//Edit existing course
export const editCourse = (id, name, description) => {
  return dispatch => {

    dispatch(loadStart());

    courses.save({
      _id: id,
      name: name,
      description: description,
      normalized: name.toLowerCase(),
    }).then((course) => {
      
      dispatch(editCourseSuccess(course._id, course.name, course.description));
      dispatch(loadEnd());

      NotificationManager
        .success(
          constants.messages.editCourse.msg,
          constants.messages.editCourse.title,
          constants.numerics.msgTimeout
        );

    }).catch((error) => {
      dispatch(editCourseError());
      dispatch(loadEnd());
      NotificationManager
        .error(
          error.message,
          constants.messages.error.title,
          constants.numerics.msgTimeout,
        );
    });
  }
}

//Executes on delete course success
export const deleteCourseSuccess = () => {
  return {
    type: actionTypes.DELETE_COURSE_SUCCESS,
    redirectPath: '/courses/my/' + sessionStorage.getItem('username')
  }
}

//Executes on delete course error
export const deleteCourseError = () => {
  return {
    type: actionTypes.DELETE_COURSE_ERROR,
    redirectPath: null
  }
}

//Deletes course by ID
export const deleteCourse = (id) => {
  return dispatch => {

    dispatch(loadStart());

    courses.removeById(id)
    .then((res) => {
      var query = new Kinvey.Query();
      query.equalTo('courseId', id);
      lectures.remove(query)
      .then((res) => {
        dispatch(deleteCourseSuccess());
        dispatch(loadEnd());

        NotificationManager
          .success(
            constants.messages.deleteCourse.msg,
            constants.messages.deleteCourse.title,
            constants.numerics.msgTimeout
          )
      })
      .catch((error) => {
        dispatch(deleteCourseError());
        dispatch(loadEnd());

        NotificationManager
        .error(
          error.message,
          constants.messages.error.title,
          constants.numerics.msgTimeout,
        );
      });
    })
    .catch((error) => {
      dispatch(deleteCourseError());
      dispatch(loadEnd());

      NotificationManager
        .error(
          error.message,
          constants.messages.error.title,
          constants.numerics.msgTimeout,
        );
    });
  }
}

//Executes on get courses success
export const getCoursesSuccess = (courses, skip) => {
  return {
    type: actionTypes.GET_COURSES_SUCCESS,
    courses: courses,
    arrowBackward: skip > 0,
    arrowForward: courses.length >= constants.numerics.pageCoursesLen
  }
}

//Executes on get courses error
export const getCoursesError = () => {
  return {
    type: actionTypes.GET_COURSES_ERROR,
    courses: [],
    arrowBackward: false,
    arrowForward: true
  }
}

//Gets courses by query. The query is set depending on which parameters differs from null,
//which determines the end result set.
export const getCourses = (userId, skip, sort, username, searchValue, userCreatorId) => {
  return dispatch => {

    dispatch(loadStart());

    var query = new Kinvey.Query();

    if(userCreatorId) {
      query.equalTo('_acl.creator', userCreatorId);
    }

    if(username === sessionStorage.getItem('username')) {
      query.equalTo('_acl.creator', userId);
    } else {
      query.notEqualTo('_acl.creator', userId);
    }
    
    query.limit = constants.numerics.pageCoursesLen;

    if(skip) {
      query.skip = skip;
    }

    if(sort) {
      if(sort === constants.sort.ascending) {
        query.ascending('name');
      } else if(sort === constants.sort.descending) {
        query.descending('name');
      }
    }

    if(searchValue) {
      var s = searchValue.toLowerCase();
      query.matches('normalized', `^${s}`);
    }

    courses.find(query)
    .subscribe((courses) => {
      dispatch(getCoursesSuccess(courses, skip));
      dispatch(loadEnd());

    }, (error) => {
      dispatch(getCoursesError());
      dispatch(loadEnd());

      NotificationManager
        .error(
          error.message,
          constants.messages.error.title,
          constants.numerics.msgTimeout,
        );
    });
  }
}
