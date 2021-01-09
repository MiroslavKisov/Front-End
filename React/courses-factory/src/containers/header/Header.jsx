import React, { useState, useEffect } from 'react';
import NavLink from '../../components/nav-link/NavLink';
import NavImage from '../../components/nav-image/NavImage';
import SearchField from '../../components/search-field/SearchField';
import studentHat from '../../static/pictures/student-hat.png';
import defaultPic from '../../static/pictures/default-profile-picture.jpg';
import Button from '../../components/button/Button';
import { withRouter } from 'react-router-dom'
import * as userActions from '../../store/actions/userActions';
import { connect } from 'react-redux';
import './Header.css';

const Header = (props) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectValue, setSelectValue] = useState('courses');
  const [searchValue, setSearchValue] = useState('');
 
  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem('token') !== null || props.isAuthenticated);
  }, [props.isAuthenticated])

  //Determines to search in 'users' collection or 'courses' collection
  const search = () => {
    if(selectValue === 'courses') {
      props.history.push('/search/courses/' + searchValue);
    } else if(selectValue === 'users') {
      props.history.push('/users/' + searchValue);
    }
    setSearchValue('');
  }

  const handleSelect = (event) => {
    setSelectValue(event.target.value);
  }

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  }

  const logoutHandler = () => {
    setIsAuthenticated(false);
    props.logout();
  }

  return(
    <div className="navigation bg-teal-500">
      <ul className="flex">
        <NavImage src={studentHat} alt={"Student Hat"}/>
        <li className="mr-6 mt-6">
          <NavLink
            className={"text-xl text-white hover:text-yellow-500"} 
            route={"/home"} 
            text={"Home"} 
            iconType={"fas fa-home fa-lg m-1 text-yellow-500"} />
        </li>
      {(isAuthenticated) ?
        <React.Fragment>
          <li className="mr-6 mt-6">
            <NavLink
              className={"text-xl text-white hover:text-yellow-500"} 
              route={"/create-course"} 
              text={"Create Course"} 
              iconType={"fas fa-chalkboard-teacher fa-lg m-1 text-yellow-500"} />
          </li>
          <li className="mr-6 mt-6">
            <NavLink
              className={"text-xl text-white hover:text-yellow-500"} 
              route={"/courses"} 
              text={"Courses"} 
              iconType={"fas fa-graduation-cap fa-lg m-1 text-yellow-500"} />
          </li>
          <form className="flex">
            <li className="mr-6 mt-4">
              <SearchField 
                value={searchValue}
                onChange={(e) => handleSearch(e)}/>
            </li>
            <li className="mr-2 mt-4">
              <select 
                value={selectValue} 
                onChange={(e) => handleSelect(e)} 
                className="rounded-full bg-yellow-500 p-3 text-white cursor-pointer" id="select-list">
                <option value="courses">Courses</option>
                <option value="users">Users</option>
              </select>
            </li>
            <li className="mr-6 mt-4">
              <Button
                onClick={search}
                className={"bg-yellow-500 p-3 text-white rounded-full hover:text-teal-500"}
                type={"button"}
                disabled={searchValue ? '' 
                 : 'disabled'}
                iconType={"fas fa-search"}/> 
            </li>
          </form>
        </React.Fragment>
        : null }
      </ul>
      {(isAuthenticated) ?
      <ul>
        {props.profilePic || sessionStorage.getItem('profilePic') ? 
        <NavImage src={props.profilePic || sessionStorage.getItem('profilePic')} /> : <NavImage src={defaultPic}/>}
        <li className="mr-6 mt-6">
          <NavLink 
            className={"text-xl text-white hover:text-yellow-500"}
            route={"/active-user"} 
            text={props.username ? props.username : sessionStorage.getItem('username')} 
            iconType={"fas fa-user-graduate fa-lg m-1 text-yellow-500"}/>
        </li>
        <li className="mr-6 mt-6">
          <NavLink 
            className={"text-xl text-white hover:text-yellow-500"}
            route={"/"}  
            text={"Logout"} 
            iconType={"fas fa-sign-out-alt fa-lg m-1 text-yellow-500"} 
            click={logoutHandler}/>
        </li>
      </ul> :
      <ul>
        <li className="mr-6 mt-6">
          <NavLink 
            className={"text-xl text-white hover:text-yellow-500"}
            route={"/register"} 
            text={"Register"} 
            iconType={"fas fa-user-plus fa-lg m-1 text-yellow-500"} />
        </li>
        <li className="mr-6 mt-6">
          <NavLink 
            className={"text-xl text-white hover:text-yellow-500"}
            route={"/login"} 
            text={"Login"} 
            iconType={"fas fa-sign-in-alt fa-lg m-1 text-yellow-500"} />
        </li>
      </ul>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
    isAuthenticated: state.userReducer.isAuthenticated,
    profilePic: state.userReducer.profilePic,
    redirectPath: state.userReducer.redirectPath,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userActions.logout()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));