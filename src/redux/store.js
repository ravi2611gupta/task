import { configureStore } from '@reduxjs/toolkit'
import loggedInUserReducer from './slice/authSlice';
import { userListReducer } from './slice/userListSlice';

export const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
    userList: userListReducer,
  },
})