import React from 'react';
import './App.css';
import Counter from './Counter'

const {Provider, Consumer} = React.createContext();

function App() {
  return (
    <div className="App">
      <Provider value={{ initialCount : 2}}>
        <Counter consumer={Consumer}/>
      </Provider>
    </div>
  );
}

export default App;
