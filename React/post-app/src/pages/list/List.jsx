import React, { useContext, useEffect } from 'react';
import MyContext from '../../Context'
import './List.css';
import {post} from '../../post.service';
import { withRouter } from 'react-router-dom'; 

export function List(props) {
  
  const list = () => {
    post.list()
    .then(posts => {
      dispatch({type: "setPosts", data: posts.data})
    });
  }

  useEffect(() => {
    list();
  }, []);

  const remove = () => {
    post.remove()
      .then(() => {
      list();
      alert('The post is deleted')
    });
  }

  const [state , dispatch] = useContext(MyContext);
  const posts = 
    state && 
    state.posts && 
    state.posts.map(post => (
  <tr key={post.title}>
    <td>{post.title}</td>
    <td>{post.body}</td>
    <td>
    <button
      type='button'
      onClick={() => props.history.push('/edit/' + post.id) } >
      Edit
    </button>
      <button onClick={(e) => remove(post.id)} >Delete</button>
    </td>
  </tr>
  ));

  return (
    <div className="list-page">
      <h2>Post Lists</h2>
      <table>
        <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          {posts}
        </tbody>
      </table>
    </div>
  );
}