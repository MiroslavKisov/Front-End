import React from 'react';

function add(props) {
  return(
    <div>
      <form onSubmit={props.submitAdd}>
        <input type="text" value={props.name} onChange={props.add}/>
        <input type="submit" value="Add"/>
      </form>
    </div>
  )
}

export default add;