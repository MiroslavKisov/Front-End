import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../icon/Icon';

const NavLink = (props) => {
  return (
    <div>
      <Icon iconType={props.iconType}/>
      <Link 
        className={props.className} 
        to={props.route}
        onClick={props.click}>
        {props.text}
      </Link>
    </div>
  );
};

export default NavLink;