import React from 'react';

const SearchField = (props) => {
  return (
    <input 
      type={props.type}
      className="rounded-full border-0 p-3 -mr-6"
      placeholder="Search"
      value={props.value}
      onChange={props.onChange}/>
  );
};

export default SearchField;