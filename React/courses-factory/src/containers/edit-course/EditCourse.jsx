import React, { useState, useEffect } from 'react';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Spinner from '../../components/spinner/Spinner';
import { Redirect } from 'react-router-dom';
import Label from '../../components/label/Label';
import Icon from '../../components/icon/Icon';
import InputField from '../../components/input-field/InputField';
import TextArea from '../../components/text-area/TextArea';
import * as constants from '../../constants/constants';
import * as coursesActions from '../../store/actions/coursesActions';
import { connect } from 'react-redux';
import './EditCourse.css';

const EditCourse = (props) => {

  const {loading, getCourseById, redirectPath, resetRedirectPath, editCourse} = props;
  const {id} = props.match.params;

  const [name, setName] = useState(sessionStorage.getItem('courseName'));
  const [nameValid, setNameValid] = useState(false);

  const [description, setDescription] = useState(sessionStorage.getItem('courseDesc'));
  const [descriptionValid, setDescriptionValid] = useState(false);

  const [remaining, setRemaining] = useState(constants.numerics.courseDescriptionMaxLen);

  useEffect(() => {
    setRemaining(constants.numerics.courseDescriptionMaxLen - description.length);
    
    //Validates the course name.
    if(name.length >= constants.numerics.courseNameMinLen &&
      name.length <= constants.numerics.courseNameMaxLen) {
     setNameValid(true);
    } else {
     setNameValid(false);
    }

    //Validates the course description. 
    if(description.length >= constants.numerics.courseDescriptionMinLen &&
      description.length <= constants.numerics.courseDescriptionMaxLen) {
      setDescriptionValid(true);
    } else {
      setDescriptionValid(false);
    }

    return () => {
      resetRedirectPath();
    }
  }, [description.length, name.length, getCourseById, resetRedirectPath]);

  const submitHandler = (event) => {
    event.preventDefault();
    editCourse(id, name, description);
  }

  const nameHandler = (event) => {
    setName(event.target.value);
  } 

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  }

  let redirect = null
  if(redirectPath) {
    redirect = <Redirect to={redirectPath}/>;
  }

  return (
    <div>
      {redirect}
      {loading ? <Spinner /> :
      <div className="form-container">
        <div className="w-2/5">
          <h1 className="text-center m-6 text-4xl text-teal-500">Edit Course</h1>
          <form onSubmit={(e) => submitHandler(e)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4 ml-6">
              <Label name={"Name"}/>
              <Icon iconType={"fas fa-chalkboard-teacher fa-lg text-white bg-teal-500 mr-2 p-2 rounded"} />
              <InputField
                type={"text"} 
                id={"course-name"}
                name={"course-name"} 
                placeholder={"Course Name"}
                value={name}
                onChange={(e) => nameHandler(e)} />

                {(nameValid && name.length > 0)  ? 
                <Icon iconType={"fas fa-check-circle fa-lg text-green-500 ml-2 p-2 rounded"} /> : 
                null}

                {(!nameValid && name.length > 0) ? 
                <Icon iconType={"fas fa-times-circle fa-lg text-red-500 ml-2 p-2 rounded"} /> : 
                null}

                {(!nameValid && name.length > 0) ? 
                <div className="text-red-500 text-xs italic mt-1">{`Required! Must be between ${constants.numerics.courseNameMinLen} and ${constants.numerics.courseNameMaxLen} characters!`}</div>
                : null}
            </div>
            <div className="mb-4 ml-6">
              <Label name={"Description"}/>
              <div className="container">
                <div>
                  <Icon iconType={"fas fa-file-alt fa-lg text-white bg-teal-500 mr-2 px-3 py-2 rounded"} />
                </div>
                <div>
                  <TextArea
                    id={"description"}
                    name={"course-description"}
                    placeholder={"Description"}
                    value={description}
                    onChange={(e) => descriptionHandler(e)} />

                    {(descriptionValid && description.length > 0)  ? 
                      <Icon iconType={"fas fa-check-circle fa-lg text-green-500 ml-2 p-2 rounded"} /> : 
                      null}

                    {(!descriptionValid && description.length > 0) ? 
                      <Icon iconType={"fas fa-times-circle fa-lg text-red-500 ml-2 p-2 rounded"} /> : 
                      null}

                    {(!descriptionValid && description.length > 0) ? 
                      <div className="text-red-500 text-xs italic mt-1">{`Required! Must be between ${constants.numerics.courseDescriptionMinLen} and ${constants.numerics.courseDescriptionMaxLen} characters!`}
                    </div> : null}

                    <div className="text-gray-700">Remaining: {remaining}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <SubmitButton 
                type={"submit"}
                disabled={(nameValid 
                  && descriptionValid
                  ) ? '' : 'disabled'}
                  value={"Save"} />
            </div>
          </form>
        </div>  
      </div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.courseReducer.loading,
    redirectPath: state.courseReducer.redirectPath
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetRedirectPath: () => dispatch(coursesActions.resetRedirectPath()),
    editCourse: (id, name, description) => dispatch(coursesActions.editCourse(id, name, description))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCourse);