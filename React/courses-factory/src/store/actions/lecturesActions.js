import * as actionTypes from './actionTypes';
import { NotificationManager } from 'react-notifications';
import * as constants from '../../constants/constants';
import * as Kinvey from 'kinvey-html5-sdk';

var lectures = Kinvey.DataStore.collection('lectures', Kinvey.DataStoreType.Network);

//Sets the loading property to true when the API call begins
export const loadStart = () => {
  return {
    type: actionTypes.LOAD_START_LECT,
    loading: true
  }
}

//Sets the loading property to false when the API call ends
export const loadEnd = () => {
  return {
    type: actionTypes.LOAD_END_LECT,
    loading: false
  }
}

//Resets the redirect path to null
export const resetRedirectPath = () => {
  return {
    type: actionTypes.RESET_REDIRECT_PATH_LECT,
    redirectPath: null,
  }
}

//Executes on add lecture success.
export const addLectureSuccess = (lectureId, courseId, lectName, lectDescription, video) => {
  return {
    type: actionTypes.ADD_LECTURE_SUCCESS,
    name: lectName,
    description: lectDescription,
    courseId: courseId,
    video: video,
    redirectPath: '/courses/' + courseId + '/lectures/' + lectureId, 
  }
}

//Executes on add lecture error
export const addLectureError = () => {
  return {
    type: actionTypes.ADD_LECTURE_ERROR,
    name: null,
    description: null,
    courseId: null,
    video: null,
    redirectPath: null
  }
}

//Adds a new lecture to a given course.
export const addLecture = (courseId, lectName, lectDescription) => {
  return dispatch => {

    dispatch(loadStart());

    lectures.save({
      name: lectName,
      description: lectDescription,
      courseId: courseId,
      video: ''
    }).then((lecture) =>  {

      dispatch(addLectureSuccess(
        lecture._id, 
        lecture.courseId, 
        lecture.name, 
        lecture.description, 
        lecture.video));

      dispatch(loadEnd());
      NotificationManager.success(
        constants.messages.addLecture.msg,
        constants.messages.addLecture.title,
        constants.numerics.msgTimeout
      );

    }).catch((error) => {
      dispatch(addLectureError());
      dispatch(loadEnd());
      NotificationManager.error(
        error.mesage,
        constants.messages.error.title,
        constants.numerics.msgTimeout
      )
    });
  }
}

//Executes on lecture success
export const getLectureSuccess = (name, description, video, creatorId) => {
  return {
    type: actionTypes.GET_LECTURE_BY_ID_SUCCESS,
    name: name,
    description: description,
    video: video,
    isCreator: creatorId === sessionStorage.getItem('userId'),
  }
}

//Executes on lecture error
export const getLectureError = () => {
  return {
    type: actionTypes.GET_LECTURE_BY_ID_ERROR,
    name: null,
    description: null,
    video: null,
    isCreator: null
  }
}

//Gets a lecture by Id
export const getLectureById = (id) => {
  return dispatch => {

    dispatch(loadStart());

    lectures.findById(id)
    .subscribe((lecture) => {
      const creatorId = lecture._acl.creator;
      sessionStorage.setItem('lectName', lecture.name);
      sessionStorage.setItem('lectDesc', lecture.description);
      sessionStorage.setItem('lectVideo', lecture.video);
      dispatch(
        getLectureSuccess(
          lecture.name, 
          lecture.description,
          lecture.video,
          creatorId));
      dispatch(loadEnd());
          
    }, (error) => {

      dispatch(getLectureError());
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

//Executes on successful upload.
export const uploadVideoSuccess = (downloadURL) => {
  return {
    type: actionTypes.UPLOAD_VIDEO_SUCCESS,
    video: downloadURL,
  }
}

//Executes on upload error,
export const uploadVideoError = () => {
  return {
    type: actionTypes.UPLOAD_PROFILE_PIC_ERROR,
    video: null,
  }
}

//Uploads video for the given lecture
export const uploadVideo = (lectureId, lectName, lectDescription, courseId, file, fileName, fileType) => {
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

            lectures.save({
              _id: lectureId,
              name: lectName,
              description: lectDescription,
              courseId: courseId,
              video: url
            }).then((res) => {

              sessionStorage.setItem('lectVideo', url);
              dispatch(uploadVideoSuccess(url));
              dispatch(loadEnd());

              NotificationManager
                .success(
                  constants.messages.uploadVideo.msg,
                  constants.messages.uploadVideo.title,
                  constants.numerics.msgTimeout
                ); 

            }).catch((error) => {
              dispatch(uploadVideoError());
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
            dispatch(uploadVideoError());
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
        dispatch(uploadVideoError());
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

//Executes on get lectures success.
export const getLecturesSuccess = (lectures, skip) => {
  return {
    type: actionTypes.GET_LECTURES_SUCCESS,
    lectures: lectures,
    arrowBackward: skip > 0,
    arrowForward: lectures.length >= constants.numerics.pageLectLen
  }
}

//Executes on get lectures error.
export const getLecturesError = () => {
  return {
    type: actionTypes.GET_LECTURES_ERROR,
    lectures: [],
    arrowBackward: false,
    arrowForward: true
  }
}

//Gets the lectures of given course depending on query params 'sort' (responsible for sorting)
//and 'skip (responsible for pagination).
export const getLectures = (courseId, skip, sort) => {
  return dispatch => {

    dispatch(loadStart());

    var query = new Kinvey.Query();
    query.equalTo('courseId', courseId);

    query.limit = constants.numerics.pageCoursesLen;
    query.skip = skip;

    if(sort === constants.sort.ascending) {
      query.ascending('name');
    } else if(sort === constants.sort.descending) {
      query.descending('name');
    }

    lectures.find(query)
      .subscribe((lectures) => {
        dispatch(getLecturesSuccess(lectures, skip));
        dispatch(loadEnd());
      }, (error) => {
        dispatch(getLecturesError());
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

//Executes on edit lecture success.
export const editLectureSuccess = (courseId, lectureId) => {
  return {
    type: actionTypes.EDIT_LECTURE_SUCCESS,
    redirectPath: '/courses/' + courseId + '/lectures/' + lectureId,
  }
}

//Executes on edit lecture error.
export const editLectureError = () => {
  return {
    type: actionTypes.EDIT_LECTURE_ERROR,
    redirectPath: null,
  }
}

//Edits a given lecture.
export const editLecture = (lectureId, name, description, video, courseId) => {
  return dispatch => {

    dispatch(loadStart());

    lectures.save({
      _id: lectureId,
      name: name,
      description: description,
      video: video,
      courseId: courseId
    })
    .then((res) => {
      dispatch(editLectureSuccess(courseId, lectureId));
      dispatch(loadEnd());
      NotificationManager
        .success(
          constants.messages.editLecture.msg,
          constants.messages.editLecture.title,
          constants.numerics.msgTimeout
        );
    })
    .catch((error) => {
      dispatch(editLectureError());
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

//Executes on delete lecture success.
export const deleteLectureSuccess = (courseId) => {
  return {
    type: actionTypes.DELETE_LECTURE_SUCCESS,
    redirectPath: '/courses/' + courseId + '/lectures'
  }
}

//Executes on delete lecture error.
export const deleteLectureError = () => {
  return {
    type: actionTypes.DELETE_LECTURE_ERROR,
    redirectPath: null
  }
}

//Deletes a given lecture. 
export const deleteLecture = (lectureId, courseId) => {
  return dispatch => {

    dispatch(loadStart());

    lectures.removeById(lectureId)
    .then((res) => {
      dispatch(deleteLectureSuccess(courseId));
      dispatch(loadEnd());

      NotificationManager
        .success(
          constants.messages.deleteLecture.msg,
          constants.messages.deleteLecture.title,
          constants.numerics.msgTimeout
        );
    })
    .catch((error) => {
      dispatch(deleteLectureError());
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