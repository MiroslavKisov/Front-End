import React from 'react';

const SubmitButton = (props) => {
  return (
    <input 
      className="bg-teal-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
      type={props.type} 
      disabled={props.disabled}
      value={props.value}/> 
  );
};

export default SubmitButton;