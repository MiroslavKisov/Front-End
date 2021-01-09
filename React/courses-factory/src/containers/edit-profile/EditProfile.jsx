import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import Icon from '../../components/icon/Icon';
import InputField from '../../components/input-field/InputField';
import Label from '../../components/label/Label';
import SubmitButton from '../../components/submit-button/SubmitButton';
import * as constants from '../../constants/constants';
import * as userActions from '../../store/actions/userActions';
import './EditProfile.css';

const EditProfile = ({redirectPath, loading, resetRedirectPath, uploadPic, uploadBgPic, updateUsername}) => {
  const [userId] = useState(sessionStorage.getItem('userId'));

  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  const [usernameValid, setUsernameValid] = useState(false);

  const [profilePicValid, setProfilePicValid] = useState(null);
  const [profileFieldTouched, setProfileFieldTouched] = useState(false);

  const [bgPictureValid, setBgPictureValid] = useState(null);
  const [bgFieldTouched, setBgFieldTouched] = useState(false);

  useEffect(
    () => {

      //Validates the username.
      if(username.length >= constants.numerics.usernameMinLen 
        && username.length <= constants.numerics.usernameMaxLen) {
        setUsernameValid(true);
      } else {
        setUsernameValid(false);
      }

      return () => {
        resetRedirectPath();
      }
  },[username.length, resetRedirectPath]);

  const uploadProfilePicture = (event) => {
    const file = event.target.files[0];

    //Determines if the input field is touched and valid.
    if(file) {
      setProfileFieldTouched(true);
      if(!validateFile(file)) {
        setProfilePicValid(false);
      } else {
        setProfilePicValid(true);
        uploadPic(userId, file, file.name, file.type)
      }
      
    } else {
      setProfileFieldTouched(false);
    }
  } 

  const uploadBgPicture = (event) => {
    const file = event.target.files[0];

    //Determines if the input field is touched and valid.
    if(file) {
      setBgFieldTouched(true);
      if(!validateFile(file)) {
        setBgPictureValid(false);
      } else {
        setBgPictureValid(true);
        uploadBgPic(userId, file, file.name, file.type)
      }
      
    } else {
      setBgFieldTouched(false);
    }
  }

  const changeUsername = (event) => {
    setUsername(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    updateUsername(userId, username);
  }

  const validateFile = (file) => {
    if((file.type !== constants.fileTypes.jpeg &&
        file.type !== constants.fileTypes.jpg &&
        file.type !== constants.fileTypes.png &&
        file.type !== constants.fileTypes.gif) ||
        file.size >= constants.numerics.maxFileSize) {
        return false;

      } else {
        return true;
      }
  }

  let redirect = null
  if(redirectPath) {
    redirect = <Redirect to={redirectPath}/>;
  } 

  return (
    <div>
      {redirect}
      {loading ? <Spinner /> : 
      <div>
      <h1 className="text-center m-6 text-4xl text-teal-500">Edit Profile</h1>
      <div className="edit-container">
        <div className="w-6/12 h-full rounded shadow-lg">
          <div className="mb-4 ml-20">
            <Label name={"Profile Picture"}/>
            <Icon iconType={"fas fa-portrait fa-lg text-white bg-teal-500 mr-2 p-2 rounded"} />
            <InputField
              type={"file"} 
              id={"bg-pic"}
              onChange={(e) => uploadProfilePicture(e)} />

              {(profilePicValid && profileFieldTouched)  ? 
                <Icon iconType={"fas fa-check-circle fa-lg text-green-500 ml-2 p-2 rounded"} /> : 
              null}

              {(!profilePicValid && profileFieldTouched) ? 
                <Icon iconType={"fas fa-times-circle fa-lg text-red-500 ml-2 p-2 rounded"} /> : 
              null}

              {(!profilePicValid && profileFieldTouched) ? 
              <div className="text-red-500 text-xs italic mt-1">
                Allowed file types: .jpeg, .jpg, .png, .gif; Max size 1MB.
              </div> : null}
          </div>

          <div className="mb-4 ml-20">
            <Label name={"Background Picture"}/>
            <Icon iconType={"far fa-image fa-lg text-white bg-teal-500 mr-2 p-2 rounded"} />
            <InputField
                type={"file"} 
                id={"bg-pic"}
                onChange={(e) => uploadBgPicture(e)} />

                {(bgPictureValid && bgFieldTouched)  ? 
                <Icon iconType={"fas fa-check-circle fa-lg text-green-500 ml-2 p-2 rounded"} /> : 
                null}

                {(!bgPictureValid && bgFieldTouched) ? 
                <Icon iconType={"fas fa-times-circle fa-lg text-red-500 ml-2 p-2 rounded"} /> : 
                null}

                {(!bgPictureValid && bgFieldTouched) ? 
                <div className="text-red-500 text-xs italic mt-1">
                  Allowed file types: .jpeg, .jpg, .png, .gif; Max size 1MB.</div> :
                null}
          </div>
          
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="mb-4 ml-20">
              <Label name={"Username"}/>
              <Icon iconType={"far fa-user fa-lg text-white bg-teal-500 mr-2 p-2 rounded"} />
              <InputField
                type={"text"} 
                id={"username"}
                name={"username"} 
                placeholder={"Username"}
                value={username}
                onChange={(e) => changeUsername(e)} />

                {(usernameValid && username.length > 0)  ? 
                <Icon iconType={"fas fa-check-circle fa-lg text-green-500 ml-2 p-2 rounded"} /> :
                null}

                {(!usernameValid && username.length > 0) ? 
                <Icon iconType={"fas fa-times-circle fa-lg text-red-500 ml-2 p-2 rounded"} /> :
                null}

                {(!usernameValid && username.length > 0) ? 
                <div className="text-red-500 text-xs italic mt-1">
                  {`Required! Must be between ${constants.numerics.usernameMinLen} and ${constants.numerics.usernameMaxLen} characters!`}
                </div> : null}
                
              </div>
              <div className="flex items-center justify-center">
                <SubmitButton 
                  type={"submit"}
                  disabled={usernameValid ? '' : 'disabled'}
                  value={"Save"} />
              </div>
          </form>
        </div>
      </div>
    </div> }
  </div>
  );
};

const mapStateToProps = (state) => {
  return {
    redirectPath: state.userReducer.redirectPath,
    loading: state.userReducer.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPic: (userId, file, fileName, fileType) => dispatch(
      userActions.uploadProfilePic(userId, file, fileName, fileType)),
    uploadBgPic: (userId, file, fileName, fileType) => dispatch(
      userActions.uploadBackgroudPic(userId, file, fileName, fileType)),
    resetRedirectPath: () => dispatch(userActions.resetRedirectPath()),
    updateUsername: (userId, username) => dispatch(userActions.updateUsername(userId, username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);