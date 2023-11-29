import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../config/axiosConfig";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchUserList = createAsyncThunk("userList/fetchUserList", async (token, thunkAPI) => {
  try {
    const response = await myAxios.get("/auth/get?limit=5", {
      headers: {
          Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    clearUserListData(state) {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
    setUserListData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserListData } = userListSlice.actions;
export const userListReducer = userListSlice.reducer;

export const selectUserListData = (state) => state.userList.data;
export const selectUserListLoading = (state) =>
  state.userList.loading;
export const selectUserListError = (state) => state.userList.error;