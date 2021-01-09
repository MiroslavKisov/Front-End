import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import InputField from '../../components/input-field/InputField';
import Icon from '../../components/icon/Icon';
import Label from '../../components/label/Label';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Spinner from '../../components/spinner/Spinner';
import * as userActions from '../../store/actions/userActions';
import { connect } from 'react-redux';

const Login = ({redirectPath, isAuthenticated, loading, login, resetRedirectPath}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(
    () => {
      return () => {
        resetRedirectPath();
      }
  },[resetRedirectPath]);

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }

  const loginHandler = (event) => {
    event.preventDefault();
    login(username, password);
  }

  let redirect = null
  if(isAuthenticated) {
    redirect = <Redirect to={redirectPath}/>;
  }

  return (
    <div>
      {redirect}
      {loading ? <Spinner/> : 
      <div className="form-container">
        <div className="w-2/5">
        <h1 className="text-center m-6 text-4xl text-teal-500">Login</h1>
          <form  onSubmit={(e) => loginHandler(e)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            </div>

            <div className="flex items-center justify-center">
              <SubmitButton 
                type={"submit"}
                value={"Login"} />
            </div>
          </form>
        </div>
      </div>}
    </div>
  );
};

const mapStateToPRops = (state) => {
  return {
    redirectPath: state.userReducer.redirectPath,
    isAuthenticated: state.userReducer.isAuthenticated,
    loading: state.userReducer.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(userActions.login(username, password)),
    resetRedirectPath: () => dispatch(userActions.resetRedirectPath())
  }
}

export default connect(mapStateToPRops, mapDispatchToProps)(Login);