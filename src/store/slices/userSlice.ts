import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://instagram-api-88fv.onrender.com/users";

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data.users;
  }
);

export const fetchUserByUsername = createAsyncThunk(
  "user/fetchUserByUsername",
  async (username) => {
    const response = await axios.get(`${API_URL}/${username}`);
    return response.data;
  }
);

export const fetchAuthenticatedUser = createAsyncThunk(
  "user/fetchAuthenticatedUser",
  async (_, { getState }) => {
    const state = getState() as { auth: { token: string } };
    const token = state.auth.token;
    const response = await axios.get(`${API_URL}/signedin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateUsername = createAsyncThunk(
  "user/updateUsername",
  async (
    { username, newUsername }: { username: string; newUsername: string },
    { getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await axios.patch(
      `${API_URL}/modify/username`,
      { username, newUsername },
      {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      }
    );
    return response.data;
  }
);

const initialState = {
  users: [],
  authenticatedUser: null,
  loading: "idle",
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = "idle";
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = "error";
        state.error = action.error.message as string;
      });
  },
});

export const { actions: userActions } = userSlice;
export default userSlice.reducer;
