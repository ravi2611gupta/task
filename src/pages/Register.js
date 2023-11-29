import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/slice/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ name: '', email: '', password: '', phone: '', mobile: '', zipCode: '', profilePic: ''});
 
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          coordinates: {
            type: 'Point',
            coordinates: [position.coords.latitude, position.coords.longitude]
          }
        };
        setUser({ ...user, address: locationData });
      },
      (error) => {
        console.error("Error obtaining location", error);
      }
    );
  }, []);


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signup(user));
    if (!result.payload.email) {
      setUser({ name: '', email: '', password: '', phone: '', mobile: '', zipCode: '', profilePic: '', address: '' })
    } else {
      setUser({ name: '', email: '', password: '', phone: '', mobile: '', zipCode: '', profilePic: '', address: '' })
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            name="name"
            fullWidth
            label="Name"
            variant="outlined"
            value={user.name}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="email"
            fullWidth
            label="Email"
            variant="outlined"
            required
            value={user.email}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="password"
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            required
            value={user.password}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="phone"
            fullWidth
            label="Phone"
            variant="outlined"
            value={user.phone}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="mobile"
            fullWidth
            label="Mobile"
            variant="outlined"
            required
            value={user.mobile}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="zipCode"
            fullWidth
            label="Zip Code"
            variant="outlined"
            required
            value={user.zipCode}
            onChange={handleChange}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">Register</Button>
      </form>

      <Box mt={2}>
        <Typography variant="body2">
          Already have an account? <RouterLink to="/"><Link>Login here</Link></RouterLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
