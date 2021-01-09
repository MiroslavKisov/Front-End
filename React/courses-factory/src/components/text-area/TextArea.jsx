import React from 'react';
import './TextArea.css';

const TextArea = (props) => {
  return (
    <textarea
      id={props.id} 
      className={"textarea-size shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} 
      name={props.name} 
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}>
    </textarea>
  );
};

export default TextArea;