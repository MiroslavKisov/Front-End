import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as lecturesActions from '../../store/actions/lecturesActions'
import Spinner from '../../components/spinner/Spinner';
import Icon from '../../components/icon/Icon';
import ItemHolder from '../../components/item-holder/ItemHolder';
import * as constants from '../../constants/constants';
import './Lectures.css';

const Lectures = (props) => {

  const {getLectures, lectures, loading, arrowForward, arrowBackward} = props;
  const {id} = props.match.params;
  
  const [skip, setSkip] = useState(0);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    getLectures(id, skip, sort);
  }, [getLectures, id, skip, sort]);

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

  let listLectures = lectures.map((element) => {
    return (
      <ItemHolder key={element._id} 
      data={element.name}
      link={'/courses/' + id + '/lectures/' + element._id}/>
    )
  });

  return (
    <div>
      {loading ? <Spinner /> :
      <div>
        <h1 className="text-center m-6 text-4xl text-teal-500">Lectures</h1>
        {listLectures.length > 0 ? <div className="flex justify-center">
          <Icon 
            iconType={"fas fa-sort-alpha-down-alt fa-lg text-gray-600 mx-6 my-1 hover:text-yellow-500 cursor-pointer"}
            onClick={sortDesc} />
          <Icon 
            iconType={"fas fa-sort-alpha-up-alt fa-lg text-gray-600 mx-6 my-1 hover:text-yellow-500 cursor-pointer"}
            onClick={sortAsc} />
        </div> : null}
        <div className="lectures-item-holder">
          {listLectures}  
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
      lectures: state.lectureReducer.lectures,
      loading: state.lectureReducer.loading,
      arrowForward: state.lectureReducer.arrowForward,
      arrowBackward: state.lectureReducer.arrowBackward,
    }
  }
  
const mapDispatchToProps = (dispatch) => {
  return {
    getLectures: (id, skip, sort) => dispatch(lecturesActions.getLectures(id, skip, sort))
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Lectures);