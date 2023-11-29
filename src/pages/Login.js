import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slice/authSlice';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(login(user));
    if (!result.payload.email) {
      setUser({ email: '', password: ''})
    } else {
      navigate(0);
      setUser({ email: '', password: '' })
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField fullWidth name="email" label="Email" value={user.name} onChange={handleChange} variant="outlined" required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth name="password" label="Password" value={user.name} onChange={handleChange} type="password" variant="outlined" required />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Box mt={2}>
          <Typography variant="body2">
            Don't have an account? <RouterLink to="/register"><Link>Register here</Link></RouterLink>
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
