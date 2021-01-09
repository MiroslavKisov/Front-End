import React from 'react';

function search(props) {
  return(
    <div>
      <form onSubmit={props.submit}>
        <input type="text"  value={props.name} onChange={props.change}/>
        <input type="submit" value="Search"/>
      </form>
    </div>
  );
}

export default search;