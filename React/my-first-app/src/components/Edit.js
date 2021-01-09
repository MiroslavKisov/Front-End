import React from 'react';

function edit(props) {
  if(props.hidden) {
    return null;
  }

  return(
    <div>
      <form onSubmit={props.save}>
        <input type="text" value={props.name} onChange={props.edit}/>
        <input type="submit" value="Save"/>
      </form>
    </div>
  )
}

export default edit;