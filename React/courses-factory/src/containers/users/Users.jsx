import React, { useState, useEffect } from 'react';
import * as userActions from '../../store/actions/userActions';
import Spinner from '../../components/spinner/Spinner';
import { Link } from 'react-router-dom';
import Icon from '../../components/icon/Icon';
import defaultPic from '../../static/pictures/default-profile-picture.jpg';
import defaultBackGround from '../../static/pictures/thumbnail-default.jpg';
import ProfileImage from '../../components/profile-image/ProfileImage';
import BgImage from '../../components/background-image/BgImage';
import * as constants from '../../constants/constants';
import { connect } from 'react-redux';
import './Users.css';

const Users = (props) => {

  const {users, loading, arrowForward, arrowBackward, searchUsers} = props;
  const {searchValue} = props.match.params;

  const [skip, setSkip] = useState(0);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    searchUsers(searchValue, skip, sort);
  }, [searchValue, skip, sort, searchUsers]);

  const sortAsc = () => {
    setSort(constants.sort.ascending);
  }

  const sortDesc = () => {
    setSort(constants.sort.descending);
  }

  //Displays the previous page.
  const previous = () => {
    setSkip(skip - constants.numerics.pageUsersLen);
  }

  //Displays the next page.
  const next = () => {
    setSkip(skip + constants.numerics.pageUsersLen);
  }

  let listUsers = users.map((user) => {
    return (
      <div key={user._id} className="user-item">
        <div className="h-full rounded shadow-lg m-2">
          <div className="flex justify-center">
            {user.bgPicture ? <BgImage src={user.bgPicture} className={"w-full"}/> : 
            <BgImage src={defaultBackGround}/> }
          </div>
          <div className="flex justify-center">
            {user.profilePic ? <ProfileImage src={user.profilePic} 
              className={"rounded-full border-solid border-white border-2 -mt-10"}/> : 
            <ProfileImage src={defaultPic} 
            className={"rounded-full border-solid border-white border-2 -mt-10"}/>}
          </div>
          <div className="flex justify-center">
            <p className="text-center text-base mt-4 text-gray-600">{user.username}</p>
          </div>
          <div className="flex justify-center">
            <Link to={'/' + user.username + '/courses/' + user._acl.creator}>
              <Icon iconType={"fas fa-graduation-cap fa-lg text-gray-600 my-6 mx-6 hover:text-yellow-500"} />
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      {loading ? <Spinner /> :
      <div>
        <h1 className="text-center m-6 text-4xl text-teal-500">Users</h1>
        {listUsers.length > 0 ? <div className="flex justify-center">
          <Icon 
            iconType={"fas fa-sort-alpha-down-alt fa-lg text-gray-600 mx-6 my-1 hover:text-yellow-500 cursor-pointer"}
            onClick={sortDesc} />
          <Icon 
            iconType={"fas fa-sort-alpha-up-alt fa-lg text-gray-600 mx-6 my-1 hover:text-yellow-500 cursor-pointer"}
            onClick={sortAsc} />
        </div> : null}
        <div className="users-holder">
          {listUsers}
        </div>
        <div className="flex justify-center">
          {arrowBackward ? <Icon 
            iconType={"fas fa-arrow-circle-left fa-lg text-gray-600 mx-6 mt-6 hover:text-yellow-500 cursor-pointer"}
            onClick={previous} /> :
            null}
          {arrowForward ? <Icon 
            iconType={"fas fa-arrow-circle-right fa-lg text-gray-600 mx-6 mt-6 hover:text-yellow-500 cursor-pointer"}
            onClick={next} /> :
            null }
        </div>
      </div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,
    loading: state.userReducer.loading,
    arrowForward: state.userReducer.arrowForward,
    arrowBackward: state.userReducer.arrowBackward
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsers: (searchValue, skip, sort) => dispatch(userActions.searchUsers(searchValue, skip, sort))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);