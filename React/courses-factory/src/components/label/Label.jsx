import React from 'react';

const Label = (props) => {
  return (
    <label 
      className="block text-gray-700 text-sm font-bold mb-2" >
        {props.name}
    </label>
  );
};

export default Label;