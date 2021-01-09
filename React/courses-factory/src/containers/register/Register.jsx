import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import InputField from '../../components/input-field/InputField';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Icon from '../../components/icon/Icon';
import Label from '../../components/label/Label';
import Spinner from '../../components/spinner/Spinner';
import { connect } from 'react-redux';
import * as userActions from '../../store/actions/userActions';
import * as constants from '../../constants/constants';
import './Register.css';

const Register = ({redirectPath, isAuthenticated, loading, register, resetRedirectPath}) => {
  
  const [username, setUsername] = useState('');
  const [usernameValid, setUsernameValid] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPassValid, setConfirmPassValid] = useState(false);

  useEffect(
    () => {

      //Validates the username
      if(username.length >= constants.numerics.usernameMinLen 
        && username.length <= constants.numerics.usernameMaxLen) {
        setUsernameValid(true);
      } else {
        setUsernameValid(false);
      }

      //Validates the password
      if(password.length >= constants.numerics.passMinLen 
        && password.length <= constants.numerics.passMaxLen) {
        setPasswordValid(true);
      } else {
        setPasswordValid(false);
      }

      //Validates the confirm password
      if(confirmPassword === password) {
        setConfirmPassValid(true);
      } else {
        setConfirmPassValid(false);
      }

      return () => {
        resetRedirectPath();
      }
      
  }, [resetRedirectPath, username.length, password.length, confirmPassword.length, confirmPassword, password]);

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }

  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    register(username, password);
  }

  let redirect = null
  if(isAuthenticated) {
    redirect = <Redirect to={redirectPath}/>;
  }

  return (
    <div>
      {redirect}
      {loading ? <Spinner /> : 
      <div className="form-container">
        <div className="w-2/5">
        <h1 className="text-center m-6 text-4xl text-teal-500">Register</h1>
          <form onSubmit={(e) => submitHandler(e)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4 ml-6">
            <Label name={"Username"}/>
            <Icon iconType={"far fa-user fa-lg text-white bg-teal-500 mr-2 p-2 rounded"} />
            <InputField
              type={"text"} 
              id={"username"}
              name={"username"} 
              placeholder={"Username"}
              value={username}
              onChange={(e) => usernameHandler(e)} />
  
              {(usernameValid && username.length > 0)  ? 
                <Icon iconType={"fas fa-check-circle fa-lg text-green-500 ml-2 p-2 rounded"} /> 
                : null}
  
              {(!usernameValid && username.length > 0) ? 
                <Icon iconType={"fas fa-times-circle fa-lg text-red-500 ml-2 p-2 rounded"} /> 
                : null}
  
              {(!usernameValid && username.length > 0) ? 
                <div className="text-red-500 text-xs italic mt-1">
                  {`Required! Must be between ${constants.numerics.usernameMinLen} and ${constants.numerics.usernameMaxLen} characters!`}
                </div> : null}
          </div>
  
          <div className="mb-4 ml-6">
            <Label name={"Password"}/>
            <Icon iconType={"fas fa-key fa-lg text-white bg-teal-500 mr-2 p-2 rounded"}/>
            <InputField
              type={"password"}
              id={"password"}
              placeholder={"Password"} 
              value={password}
              onChange={(e) => passwordHandler(e)} />
  
              {(passwordValid && password.length > 0)  ? 
                <Icon iconType={"fas fa-check-circle fa-lg text-green-500 ml-2 p-2 rounded"} /> 
                : null}
              {(!passwordValid && password.length > 0) ? 
                <Icon iconType={"fas fa-times-circle fa-lg text-red-500 ml-2 p-2 rounded"} /> 
                : null}
              {(!passwordValid && password.length > 0) ? 
                <div className="text-red-500 text-xs italic mt-1">
                  {`Required! Must be between ${constants.numerics.passMinLen} and ${constants.numerics.passMaxLen} characters!`}
                </div> : null}
          </div>
  
          <div className="mb-4 ml-6">
            <Label name={"Confirm Password"}/>
            <Icon iconType={"fas fa-key fa-lg text-white bg-teal-500 mr-2 p-2 rounded"}/>
            <InputField
              type={"password"}
              id={"confirmPassword"}
              placeholder={"Confirm Password"} 
              value={confirmPassword}
              onChange={(e) => confirmPasswordHandler(e)} />
  
              {(confirmPassValid && confirmPassword.length > 0)  ? 
                <Icon iconType={"fas fa-check-circle fa-lg text-green-500 ml-2 p-2 rounded"} /> :
                null}
  
              {(!confirmPassValid && confirmPassword.length > 0) ? 
                <Icon iconType={"fas fa-times-circle fa-lg text-red-500 ml-2 p-2 rounded"} /> :
                null}
  
              {(!confirmPassValid && confirmPassword.length > 0) ? 
                <div className="text-red-500 text-xs italic mt-1">Required! Must match password!</div> : 
                null}
          </div>
  
          <div className="flex items-center justify-center">
            <SubmitButton 
              type={"submit"}
              disabled={(usernameValid 
                && passwordValid 
                && confirmPassValid ) ? 
                '' : 
                'disabled'}
                value={"Submit"} />
          </div>
          </form>
        </div>
      </div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    redirectPath: state.userReducer.redirectPath,
    isAuthenticated: state.userReducer.isAuthenticated,
    loading: state.userReducer.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (username, password) => dispatch(userActions.register(username, password)),
    resetRedirectPath: () => dispatch(userActions.resetRedirectPath())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);