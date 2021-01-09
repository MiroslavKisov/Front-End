import React, { useState, useContext } from 'react';
import { Consumer } from './Context';

const Counter = (props) => {

  const { initialCount } = useContext(props.consumer);
  const [count, setCount] = useState(initialCount);

  return (
    <button onClick={() => setCount(prevCount => prevCount + 1)}>
      Increment: {count}
    </button>
  );
}

export default Counter;