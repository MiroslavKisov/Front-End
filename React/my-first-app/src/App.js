import React, {useState} from 'react';
import Item from './components/Item';
import Search from './components/Search';
import Add from './components/Add';
import Edit from './components/Edit';
import './App.css';
import { tsPropertySignature } from '@babel/types';

function App() {

  let copiedTodos = [];
  const [todos, setTodos] = useState(['One', 'Two', 'Three']);
  const [id, setId] = useState(0);
  const [addValue, setAddValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [editValue, setEditValue] = useState('');
  const [isHidden, setHidden] = useState(true);

  function addItem(event) {
    setAddValue(event.target.value);
  }

  function onAddItemSubmit(event) {
    event.preventDefault();
    setTodos(todos.concat(addValue));
    setAddValue('');
  }

  function deleteItem(event, id) {
    copiedTodos = todos.slice();
    copiedTodos.splice(id, 1);
    setTodos(copiedTodos);
  }

  function editItem(event) {
    setEditValue(event.target.value);
  }

  function showEditForm(event, element, index) {
    setHidden(false);
    setId(index)
    setEditValue(element);
  }

  function saveItem(event, value, id) {
    event.preventDefault();
    copiedTodos = todos.slice();
    copiedTodos.splice(id, 1, value);
    setTodos(copiedTodos);
    setHidden(true);
  }

  function search(event) {
    setSearchValue(event.target.value);
  }

  function onSearchSubmit(event) {
    event.preventDefault();
    setTodos(todos.filter(e => e === searchValue));
    setSearchValue('');
  }

  let list = todos.map((element, index) => {
      return (
        <Item
          key={index} 
          name={element}
          showForm={(e) => showEditForm(e, element, index)}
          del={(e) => deleteItem(e, index)}/>
      )
    }
  );

  return (
    <div className="App">
      <Edit 
        hidden={isHidden} 
        save={(e) => saveItem(e, editValue, id)}
        edit={(e) => editItem(e)}
        name={editValue}/>
      <Add 
        add={(e) => addItem(e)} 
        submitAdd={(e) => onAddItemSubmit(e)}
        name={addValue}/>
      <Search
        change={(e) => search(e)} 
        submit={(e) => onSearchSubmit(e)}
        name={searchValue}/>
      <ul>
        {list}
      </ul>
    </div>
  );
}

export default App;
