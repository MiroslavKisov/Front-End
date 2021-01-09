import React, { useReducer } from 'react';
import './App.css';
import { MyProvider } from './Context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Edit, List } from './pages'
import { reducer } from './store'

function App() {
  return (
    <MyProvider value={useReducer(reducer, { posts: [] })}>
      <Router>
        <Switch>
          <Route path="/" exact component={List}/>
          <Route path="/edit/:id" component={Edit}/>
        </Switch>
      </Router>
    </MyProvider>
  );
}


export default App;