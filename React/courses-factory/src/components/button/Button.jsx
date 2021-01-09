import React from 'react';
import Icon from '../../components/icon/Icon';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={props.className} 
      disabled={props.disabled}
      type={props.type}>
      <Icon iconType={props.iconType}/>
      {props.text}
    </button>
  );
};

export default Button;