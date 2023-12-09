import {
  createSlice,
  createAsyncThunk,
  AsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { User } from "../../types/types";

const fetchProfileDetails: AsyncThunk<User, void, object> = createAsyncThunk(
  "profile/fetchProfileDetails",
  async () => {
    const response = await axios.get(
      "https://instagram-api-88fv.onrender.com/users/signedin",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data;
  }
);

type ProfileState = {
  user: User;
  status: string;
  error: string;
};

const initialState: ProfileState = {
  user: {
    username: "username",
    fullname: "Full Name",
    email: "email@gmail.com",
    profilePhoto: "base64 string",
    _id: "",
    posts: [],
    followers: [],
    following: [],
  },
  status: "idle",
  error: "error",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProfileDetails.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.user = {
            _id: action.payload?._id || initialState.user._id,
            username: action.payload?.username || initialState.user.username,
            fullname: action.payload?.fullname || initialState.user.fullname,
            email: action.payload?.email || initialState.user.email,
            profilePhoto:
              action.payload?.profilePhoto || initialState.user.profilePhoto,
            posts: action.payload?.posts || initialState.user.posts,
            followers: action.payload?.followers || initialState.user.followers,
            following: action.payload?.following || initialState.user.following,
          };
        }
      )
      .addCase(fetchProfileDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export { fetchProfileDetails };
export default profileSlice.reducer;
