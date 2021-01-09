import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../store/actions/userActions';
import defaultPic from '../../static/pictures/default-profile-picture.jpg';
import defaultBackGround from '../../static/pictures/thumbnail-default.jpg';
import ProfileImage from '../../components/profile-image/ProfileImage';
import BgImage from '../../components/background-image/BgImage';
import Spinner from '../../components/spinner/Spinner';
import Icon from '../../components/icon/Icon';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = ({userId, username, profilePic, bgPicture, loading, getUser}) => {
 
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div>
      {loading ? <Spinner /> : 
      <div>
        <h1 className="text-center m-6 text-4xl text-teal-500">Profile</h1>
        <div className="profile-card">
          <div className="w-5/12 h-full rounded overflow-hidden shadow-lg">
            <div className="flex justify-center">
              {bgPicture ? <BgImage src={bgPicture} className={"h-40 w-64 ml-5 rounded border-teal-500 border-2"}/> : 
              <BgImage src={defaultBackGround} className={"h-40 w-64 ml-5 rounded border-teal-500 border-2"}/> }
            </div>
            <div className="flex justify-center">
              {profilePic ? <ProfileImage src={profilePic} className={"rounded-full border-solid border-white border-2 -mt-10"}/> : 
              <ProfileImage src={defaultPic} className={"rounded-full border-solid border-white border-2 -mt-10"}/>}
            </div>
            <div className="flex justify-center">
                <p className="text-gray-600">{username}</p>
            </div>
            <div className="flex justify-center">
              <Link to={"/courses/my/" + username}>
                <Icon iconType={"fas fa-graduation-cap fa-lg text-gray-600 my-6 mx-6 hover:text-yellow-500"} />
              </Link>
              <Link to={"/edit-profile/" + userId}>
                <Icon iconType={"fas fa-edit fa-lg text-gray-600 my-6 mx-6 hover:text-yellow-500"} />
              </Link>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.userId,
    username: state.userReducer.username,
    profilePic: state.userReducer.profilePic,
    bgPicture: state.userReducer.bgPicture,
    loading: state.userReducer.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(userActions.getActiveUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);