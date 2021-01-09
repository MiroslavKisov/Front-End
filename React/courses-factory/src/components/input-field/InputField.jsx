import React from 'react';

const InputField = (props) => {
  return (
    <input
      id={props.id}
      value={props.value} 
      onChange={props.onChange} 
      className="shadow appearance-none border rounded w-9/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      type={props.type}
      name={props.name} 
      placeholder={props.placeholder}/>
  );
};

export default InputField;