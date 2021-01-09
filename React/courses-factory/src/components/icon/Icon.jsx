import React from 'react';

const Icon = (props) => {
  return (
    <i className={props.iconType} onClick={props.onClick}></i>
  );
};

export default Icon;