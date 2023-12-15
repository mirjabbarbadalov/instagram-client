import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/allUserSlice";
import profileSlice from "./slices/profileSlice";
import friendSlice from "./slices/friendSlice";
import postsSlice from "./slices/postsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileSlice,
    friend: friendSlice,
    posts: postsSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
