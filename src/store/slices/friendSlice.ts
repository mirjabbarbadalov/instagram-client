import {
  createSlice,
  createAsyncThunk,
  AsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { User } from "../../types/types";

const FetchFriendDetails: AsyncThunk<User, string, object> = createAsyncThunk(
  "profile/fetchFriendDetails",
  async (friendName: string) => {
    const response = await axios.get(
      `https://instagram-api-88fv.onrender.com/users/get/${friendName}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    return response.data;
  }
);

type FriendSlice = {
  friend: User;
  status: string;
  error: string;
};

const initialState: FriendSlice = {
  friend: {
    username: "username",
    fullName: "Full Name",
    email: "email@gmail.com",
    profilePhoto: "base64 string",
    id: "",
    posts: [],
    followers: [],
    following: [],
  },
  status: "idle",
  error: "error",
};

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchFriendDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        FetchFriendDetails.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.friend = {
            id: action.payload?.id || initialState.friend.id,
            username: action.payload?.username || initialState.friend.username,
            fullName: action.payload?.fullName || initialState.friend.fullName,
            email: action.payload?.email || initialState.friend.email,
            profilePhoto:
              action.payload?.profilePhoto || initialState.friend.profilePhoto,
            posts: action.payload?.posts || initialState.friend.posts,
            followers:
              action.payload?.followers || initialState.friend.followers,
            following:
              action.payload?.following || initialState.friend.following,
          };
        }
      )
      .addCase(FetchFriendDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export { FetchFriendDetails };
export default friendSlice.reducer;
