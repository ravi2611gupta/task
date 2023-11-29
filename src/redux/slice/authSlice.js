import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import myAxios from '../../config/axiosConfig';

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await myAxios.post('/auth/register', userData);
      localStorage.setItem('token', response.data.token);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await myAxios.post('/auth/login', credentials);
      response.data.token && localStorage.setItem('token', response.data.token);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({formData, token}, { rejectWithValue }) => {
    try {
      const response = await myAxios.patch('/auth/update', formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userProfile = createAsyncThunk(
  'auth/userProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await myAxios.get('/auth/get-profile', {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: {
    [signup.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [signup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [signup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [login.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [userProfile.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [userProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [userProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateProfile.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [updateProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
