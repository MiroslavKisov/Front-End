import React, { useContext } from 'react';
import MyContext from '../Context';

export function Counter(props) {

  const [state, dispatch] = useContext(MyContext);
  return (
    <button onClick={() => dispatch({ type: 'increment' })}>
      Increment: {state.count}
    </button>
  );
}