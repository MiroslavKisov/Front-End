import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as coursesActions from '../../store/actions/coursesActions'
import Spinner from '../../components/spinner/Spinner';
import Icon from '../../components/icon/Icon';
import ItemHolder from '../../components/item-holder/ItemHolder';
import * as constants from '../../constants/constants';
import './Courses.css';

const Courses = (props) => {

  const [skip, setSkip] = useState(0);
  const [sort, setSort] = useState(null);

  const {loading, courses, getCourses, arrowForward, arrowBackward} = props;
  const {username} = props.match.params;
  const {searchValue} = props.match.params;
  const {userCreatorId} = props.match.params;

  useEffect(() => {
    getCourses(sessionStorage.getItem('userId'), skip, sort, username, searchValue, userCreatorId);
  }, [getCourses, skip, sort, username, searchValue, userCreatorId]);

  let listCourses = courses.map((element) => {
    return (
      <ItemHolder key={element._id} data={element.name} link={'/courses/' + element._id}/>
    )
  });

  const sortAsc = () => {
    setSort(constants.sort.ascending);
  }

  const sortDesc = () => {
    setSort(constants.sort.descending);
  }

  //Displays the previous page.
  const previous = () => {
    setSkip(skip - constants.numerics.pageCoursesLen);
  }

  //Displays the next page.
  const next = () => {
    setSkip(skip + constants.numerics.pageCoursesLen);
  }

  return (
    <div>
      {loading ? <Spinner /> :
      <div>
        <h1 className="text-center m-6 text-4xl text-teal-500">Courses</h1>
        {listCourses.length > 0 ? <div className="flex justify-center">
          <Icon 
            iconType={"fas fa-sort-alpha-down-alt fa-lg text-gray-600 mx-6 my-1 hover:text-yellow-500 cursor-pointer"}
            onClick={sortDesc} />
          <Icon 
            iconType={"fas fa-sort-alpha-up-alt fa-lg text-gray-600 mx-6 my-1 hover:text-yellow-500 cursor-pointer"}
            onClick={sortAsc} />
        </div> : null}
        <div className="course-item-holder">
          {listCourses}  
        </div>
        <div className="flex justify-center">
          {arrowBackward ? <Icon 
            iconType={"fas fa-arrow-circle-left fa-lg text-gray-600 mx-6 my-2 hover:text-yellow-500 cursor-pointer"}
            onClick={previous} /> :
            null}
          {arrowForward ? <Icon 
            iconType={"fas fa-arrow-circle-right fa-lg text-gray-600 mx-6 my-2 hover:text-yellow-500 cursor-pointer"}
            onClick={next} /> :
            null }
        </div>
      </div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    courses: state.courseReducer.courses,
    loading: state.courseReducer.loading,
    arrowForward: state.courseReducer.arrowForward,
    arrowBackward: state.courseReducer.arrowBackward
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCourses: (
      userId, 
      skip, 
      sort, 
      username,
      searchValue,
      userCreatorId
      ) => dispatch(
        coursesActions.getCourses(
          userId, 
          skip, 
          sort, 
          username,
          searchValue,
          userCreatorId
        ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);