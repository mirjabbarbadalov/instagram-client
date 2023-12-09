import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/allUserSlice";
import profileSlice from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileSlice,
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