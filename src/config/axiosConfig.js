import axios from 'axios';
// http://localhost:5000/api
// https://task-backend-lime.vercel.app/api
const myAxios = axios.create({
  baseURL: 'https://task-backend-lime.vercel.app/api',
});

export default myAxios;