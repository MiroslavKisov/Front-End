import axios from 'axios';
const api = axios;

export const post = {
  list() {
    return api.get('https://jsonplaceholder.typicode.com/posts');
  },

  remove(id) {
    return api.delete('https://jsonplaceholder.typicode.com/posts/' + id);
  }
}