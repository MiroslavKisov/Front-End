import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../Context';

export function Edit(props) {
  const [state, dispatch] = useContext(MyContext);
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [post, setPost] = useState({});

  useEffect(() => {
    if(props.match.params.id) {
      state && state.posts.forEach(v => {
        setBody(v.title);
        setTitle(v.body);
        setPost(v);
      })
    }
  }, [])

  const save = (e) => {
    e.preventDefault();
    console.log()
  }

  return (
    <div>
      <h2>Add/Edit Post</h2>
      <form onSubmit={save}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}/>
        <br />
        <input 
          type="text" 
          placeholder="Description" 
          value={body} 
          onChange={(e) => setBody(e.target.value)}/>
        <br/>
        <button>Save</button>
      </form>
    </div>
  );
}

