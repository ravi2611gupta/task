import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userProfile } from './redux/slice/authSlice';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(userProfile(token));
  }, [token])

  return (
    <Routes>
      <Route path="/" element={token && token !== 'undefined' ? <Home/> : <Login />}/>
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
