import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostData } from "../../types/types";

interface PostsState {
  allPosts: PostData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
}

const initialState: PostsState = {
  allPosts: [],
  status: "idle",
  error: "",
};

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    try {
      const data = await fetch(
        "https://instagram-api-88fv.onrender.com/api/posts"
      );
      const response = await data.json();
      return response;
    } catch (error) {
      throw Error("Error fetching posts");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allPosts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export default postsSlice.reducer;
