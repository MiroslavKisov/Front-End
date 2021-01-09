import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/spinner/Spinner';
import * as lecturesActions from '../../store/actions/lecturesActions';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Icon from '../../components/icon/Icon';
import InputField from '../../components/input-field/InputField';
import Modal from '../../components/modal/Modal';
import * as constants from '../../constants/constants';
import './LectureDetails.css';

const LectureDetails = (props) => {

const {name, 
      description, 
      video, loading, 
      getLectureById, 
      uploadVideo, 
      redirectPath, 
      resetRedirectPath,
      deleteLecture,
      isCreator
      } = props;

const {courseId} = props.match.params;
const {lectureId} = props.match.params;

const [videoModal, setVideoModal] = useState(false);
const [delModal, setDelModal] = useState(false);

const [videoValid, setVideoValid] = useState(null);
const [videoFieldTouched, setVideoFieldTouched] = useState(false);

useEffect(() => {
    getLectureById(lectureId);

    return () => {
      resetRedirectPath();
    }

  }, [resetRedirectPath, getLectureById, lectureId]);

  const toggleVideoModal = () => {
    setDelModal(false);
    setVideoModal(!videoModal);
  }

  const openDelModal = () => {
    setVideoModal(false);
    setDelModal(true);
  }

  const closeDelModal = () => {
    setDelModal(false);
  }

  const closeVideoModal = () => {
    setVideoModal(false);
  }

  const deleteHandler = () => {
    setVideoModal(false);
    deleteLecture(lectureId, courseId);
  }

  const uploadVideoHandler = (event) => {
    const file = event.target.files[0];
    //Determines if the input field is touched and valid.
    if(file) {
      setVideoFieldTouched(true);
      if(!validateFile(file)) {
        setVideoValid(false);
      } else {
        setVideoValid(true);
        setVideoModal(false);
        uploadVideo(
          lectureId, 
          name, 
          description, 
          courseId, 
          file, 
          file.name, 
          file.type);
      }
    } else {
      setVideoFieldTouched(false);
    }
  } 

  const validateFile = (file) => {
    if(file.type !== constants.fileTypes.mp4) {
      return false;
    } else {
      return true;
    }
  }

  //Determines which modal to display based on the state of 'videoModal' and 'delModal'
  let modal = null;
  if(videoModal) {
    modal = (<Modal
      onClick={closeVideoModal}
      header={"Add Video"}>
      <div className="flex justify-center my-10">
        <Icon iconType={"fas fa-film fa-lg text-white bg-teal-500 my-1 mr-2 p-2 rounded"} />
          <InputField
            type={"file"} 
            id={"lecture-video"}
            onChange={(e) => uploadVideoHandler(e)}
            />
          {(!videoValid && videoFieldTouched) ? 
            <Icon iconType={"fas fa-times-circle fa-lg text-red-500 ml-2 p-2 rounded"} /> : 
          null}
      </div>
      <div>
        {(!videoValid && videoFieldTouched) ? 
        <div className="text-red-500 -mt-8 ml-6 text-xs italic">
          Allowed file types: mp4.
        </div> : null}
      </div>
    </Modal>);
  } else if(delModal) {
    modal = (<Modal
      onClick={closeDelModal}
      header={"Are you sure?"}>
      <div className="flex justify-center mt-20">
        <Icon 
          iconType={"fas fa-check fa-lg text-green-600 mx-6 mt-2 hover:text-yellow-500"}
          onClick={deleteHandler} 
         />
        <Icon 
          iconType={"fas fa-times fa-lg text-red-600 mx-6 mt-2 hover:text-yellow-500"} 
          onClick={closeDelModal}/>
      </div>
    </Modal>);
  } 

  let redirect = null
  if(redirectPath) {
    redirect = <Redirect to={redirectPath}/>;
  }

  return (
    <div>
      {redirect}
      {loading ? <Spinner/> : 
      <div>
        {modal}
        <h1 className="text-center m-6 text-4xl text-teal-500">Lecture Details</h1>
        <div className="lecture-container">
          {delModal || videoModal ? 
          <video id="video" className="video-disabled" src={video ? video : null} alt="Lecture" width="800" height="600" controls type="video/mp4"></video> :
          <video id="video" src={video ? video : null} alt="Lecture" width="800" height="600" controls type="video/mp4"></video>}
          <div className="h-full w-full ml-5 overflow-y-scroll">
            <p className="text-center my-4 text-2xl text-gray-700">{name}</p>
              <hr/>
            <p className="text-center m-2 text-gray-700">{description}</p>
            <hr/>
            {isCreator ? 
            <div className="flex justify-between">
              <ul>
                <li>
                  <Icon
                    onClick={toggleVideoModal}  
                    iconType={"fas fa-upload fa-lg text-gray-600 ml-2 mt-2 hover:text-yellow-500 cursor-pointer"} />
                </li>
                <li>
                  <Link to={`/courses/${courseId}/lectures/${lectureId}/edit`}>
                    <Icon iconType={"fas fa-edit fa-lg text-gray-600 ml-2 mt-2 hover:text-yellow-500"} />
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Icon 
                    iconType={"fas fa-trash-alt fa-lg text-gray-600 ml-2 mt-2 hover:text-yellow-500 cursor-pointer"}
                    onClick={openDelModal} 
                    />
                </li>
              </ul>
            </div> : 
            null}
          </div>
        </div>
      </div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.lectureReducer.name,
    description: state.lectureReducer.description,
    loading: state.lectureReducer.loading,
    video: state.lectureReducer.video,
    redirectPath: state.lectureReducer.redirectPath,
    isCreator: state.lectureReducer.isCreator
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    resetRedirectPath: () => dispatch(lecturesActions.resetRedirectPath()),
    deleteLecture: (lectureId, courseId) => dispatch(lecturesActions.deleteLecture(lectureId, courseId)),
    getLectureById: (id) => dispatch(lecturesActions.getLectureById(id)),
    uploadVideo: (
      lectureId, 
      lectName, 
      lectDescription, 
      courseId, 
      file, 
      fileName, 
      fileType) => dispatch(lecturesActions.uploadVideo(

        lectureId, 
        lectName, 
        lectDescription, 
        courseId, 
        file, 
        fileName, 
        fileType)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LectureDetails);