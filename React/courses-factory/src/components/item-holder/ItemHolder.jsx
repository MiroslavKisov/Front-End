import React from 'react';
import Icon from '../icon/Icon';
import { Link } from 'react-router-dom';

const ItemHolder = (props) => {
  return (
    <div className="rounded shadow-lg h-24 w-64 m-2">
      <p className="text-center text-sm mt-4 text-gray-600">{props.data}</p>
      <div className="flex justify-center mt-6">
      <Link to={props.link}>
        <Icon 
          iconType={"fas fa-info-circle fa-lg text-green-500 hover:text-yellow-500 cursor-pointer"} />
      </Link>
      </div>
    </div>
  );
};

export default ItemHolder;