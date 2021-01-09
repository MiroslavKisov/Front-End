import React from 'react';

function item(props) {
  return(
    <div>
      <li>{props.name}
        <button onClick={props.showForm}>Edit</button>
        <button onClick={props.del}>Delete</button>
      </li>
    </div>
  );
}

export default item;