import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchProfileDetails } from "../../store/slices/profileSlice";
import { ThunkDispatch } from "redux-thunk";
import { State } from "../../types/types";
import { Action } from "@reduxjs/toolkit";

interface Profile {
  username: string;
  fullname: string;
  email: string;
  profilePhoto: string;
}

interface ProfileState {
  user: Profile;
  status: string;
  error: string;
}

const TestProfile: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const { user, status, error } = useSelector(
    (state: RootState) => state.profile
  ) as ProfileState;

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  const renderContent = () => {
    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (status === "failed") {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h1>{user.fullname}</h1>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <img
          src={`data:image/jpeg;base64,${user.profilePhoto}`}
          alt="Profile"
        />
      </div>
    );
  };

  return (
    <div>
      <h1>User Profile</h1>
      {renderContent()}
    </div>
  );
};

export default TestProfile;
