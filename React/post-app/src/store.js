import axios from 'axios';
const api = axios;

export const reducer = (state, action) => {
  const store = {
    setPosts() {
      return { posts: action.data }
    }
  }

  return (
      (action && action.type && store[action.type] && store[action.type]()) || 
    state
  );
};