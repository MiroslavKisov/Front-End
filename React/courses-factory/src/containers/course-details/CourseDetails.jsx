import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/spinner/Spinner';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Icon from '../../components/icon/Icon';
import Modal from '../../components/modal/Modal';
import * as coursesActions from '../../store/actions/coursesActions';
import './CourseDetails.css';

const CourseDetails = (props) => {

  const {
    name, 
    description, 
    loading, 
    getCourseById, 
    deleteCourse, 
    redirectPath, 
    resetRedirectPath,
    isCreator,
    creator
  } = props;

  const {id} = props.match.params;

  const[showModal, setShow] = useState(false);

  useEffect(() => {
    getCourseById(id);

    return () => {
      resetRedirectPath();
    }
  }, [resetRedirectPath, getCourseById, id]);

  const show = () => {
    setShow(true);
  }

  const close = () => {
    setShow(false);
  }

  const deleteHandler = () => {
    setShow(false);
    deleteCourse(id);
  }

  let modal = null;
  if(showModal) {
    modal = (<Modal
      onClick={close}
      header={"Are you sure?"}>
      <div className="flex justify-center mt-20">
        <Icon 
          iconType={"fas fa-check fa-lg text-green-600 mx-6 mt-2 hover:text-yellow-500"} 
          onClick={deleteHandler}/>

        <Icon 
          iconType={"fas fa-times fa-lg text-red-600 mx-6 mt-2 hover:text-yellow-500"} 
          onClick={close}/>
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
      {modal}
      {loading ? <Spinner /> : 
      <div>
        <h1 className="text-center m-6 text-4xl text-teal-500">Course Details</h1>
        <div className="course-container">
            <div className="h-full w-7/12 px-8 py-8 overflow-y-scroll rounded shadow-lg my-2">
              <h2 className="text-center m-2 text-2xl text-gray-700">{name}</h2>
              <hr/>
              <p className="text-center m-2 text-gray-700">{description}</p>
              <hr/>
            <div className="flex justify-between">
              <ul>
                <li>
                  <Link to={`/courses/${id}/lectures`}>
                    <Icon iconType={"fas fa-book-reader fa-lg text-gray-600 ml-2 mt-2 hover:text-yellow-500 cursor-pointer"} />
                  </Link>
                </li>
                {isCreator ?
                <React.Fragment>
                <li>
                  <Link to={`/courses/${id}/add-lecture`}>
                    <Icon iconType={"fas fa-book-medical fa-lg text-gray-600 ml-2 mt-2 hover:text-yellow-500 cursor-pointer"} />
                  </Link>
                </li> 
                <li>
                  <Link to={`/courses/${id}/edit`}>
                    <Icon iconType={"fas fa-edit fa-lg text-gray-600 ml-2 mt-2 hover:text-yellow-500 cursor-pointer"} />
                  </Link>
                </li>
                </React.Fragment>  
                : null}
              </ul>
              <ul>
                {isCreator ?
                <li>
                <Icon 
                    iconType={"fas fa-trash-alt fa-lg text-gray-600 ml-2 mt-2 hover:text-yellow-500 cursor-pointer"} 
                    onClick={show}/>
                </li> :
                <li className="text-gray-600">Author: {creator}</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.courseReducer.name,
    description: state.courseReducer.description,
    loading: state.courseReducer.loading,
    redirectPath: state.courseReducer.redirectPath,
    isCreator: state.courseReducer.isCreator,
    creator: state.courseReducer.creator
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCourseById: (id) => dispatch(coursesActions.getCourseById(id)),
    deleteCourse: (id) => dispatch(coursesActions.deleteCourse(id)),
    resetRedirectPath: () => dispatch(coursesActions.resetRedirectPath())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);