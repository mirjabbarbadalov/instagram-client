import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { User } from "../../types/types";

const api = axios.create({
  baseURL: "https://instagram-api-88fv.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchProfileDetails = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("profile/fetchProfileDetails", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/users/signedin", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch profile details");
  }
});

type ProfileState = {
  user: User;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
};

const initialState: ProfileState = {
  user: {
    username: "username",
    fullName: "Full Name",
    email: "email@gmail.com",
    profilePhoto: "base64 string",
    id: "",
    posts: [],
    followers: [],
    following: [],
    _id: "",
  },
  status: "idle",
  error: "",
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
            id: action.payload?.id || initialState.user.id,
            username: action.payload?.username || initialState.user.username,
            fullName: action.payload?.fullName || initialState.user.fullName,
            email: action.payload?.email || initialState.user.email,
            profilePhoto:
              action.payload?.profilePhoto || initialState.user.profilePhoto,
            posts: action.payload?.posts || initialState.user.posts,
            followers: action.payload?.followers || initialState.user.followers,
            following: action.payload?.following || initialState.user.following,
            _id: action.payload?._id || initialState.user._id,
          };
        }
      )
      .addCase(fetchProfileDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Unknown error";
      });
  },
});

export { fetchProfileDetails };
export default profileSlice.reducer;
