import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Divider,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserList,
  selectUserListData,
} from '../redux/slice/userListSlice';
import { logout, updateProfile } from '../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    mobile: '',
    phone: '',
  });

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser.user);
  const userListData = useSelector(selectUserListData);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    await dispatch(fetchUserList(token));
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setEditProfileMode(false);
  };

  const handleEditProfile = () => {
    setEditProfileMode(true);
    setProfileData({
      name: loggedInUser.name,
      email: loggedInUser.email,
      mobile: loggedInUser.mobile,
      phone: loggedInUser.phone,
    });
  };

  const handleCancelEdit = () => {
    setEditProfileMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateProfile({ formData: profileData, token }));
    if (!result.payload.email) {
      setEditProfileMode(false);
    } else {
      setEditProfileMode(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchUsers();
      },
      (error) => {
        console.error('Error obtaining location', error);
      }
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate(0)
  };

  const renderAvatar = (user) => {
    if (user.profilePic) {
      return <Avatar alt={user.name} style={{marginRight: '15px'}} src={user.profilePic} />;
    } else {
      return <Avatar style={{marginRight: '15px'}} >{user.name[0]}</Avatar>;
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Users List
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper>
            {userListData ? (
              <List>
                {userListData?.map((user) => (
                  <ListItem button key={user._id} onClick={() => handleSelectUser(user)}>
                    {renderAvatar(user)}
                    <ListItemText primary={user.name} secondary={user.email} />
                  </ListItem>
                ))}
              </List>
            ) : null}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          {loggedInUser && (
            <Paper>
              <div style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                  Your Profile
                </Typography>
                <Divider />
                <Typography variant="body1" gutterBottom style={{ marginTop: '20px' }}>
                  Name: {loggedInUser.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Email: {loggedInUser.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Phone: {loggedInUser.phone}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Mobile: {loggedInUser.mobile}
                </Typography>
                <Button variant="contained" style={{marginRight: '20px', marginTop: '20px'}} color="primary" onClick={handleEditProfile}>
                  Edit Profile
                </Button>
                <Button variant="contained" style={{marginTop: '20px'}} color="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {selectedUser ? (
            <Paper>
              {editProfileMode ? (
                <div style={{ padding: '20px' }}>
                  <Typography variant="h5" gutterBottom>
                    Edit Profile
                  </Typography>
                  <Divider />
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      required
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      required
                    />
                    <TextField
                      label="Mobile"
                      name="mobile"
                      value={profileData.mobile}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      required
                    />
                    <TextField
                      label="Phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      required
                    />
                    <Button type="submit" style={{marginRight: '20px', marginTop: '20px'}} variant="contained" color="primary">
                      Save
                    </Button>
                    <Button variant="outlined" style={{marginTop: '20px'}} color="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </form>
                </div>
              ) : (
                <UserProfile user={selectedUser} />
              )}
            </Paper>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
};

const UserProfile = ({ user }) => (
  <div style={{ padding: '20px' }}>
    <Typography variant="h5" gutterBottom>
      {user.name}'s Profile
    </Typography>
    <Divider />
    <Typography variant="body1" gutterBottom style={{ marginTop: '20px' }}>
      Email: {user.email}
    </Typography>
    <Typography variant="body1" gutterBottom style={{ marginTop: '20px' }}>
      Mobile: {user.mobile}
    </Typography>
    <Typography variant="body1" gutterBottom style={{ marginTop: '20px' }}>
      Phone: {user.phone}
    </Typography>
    {/* Add more profile details here */}
  </div>
);

export default Home;
