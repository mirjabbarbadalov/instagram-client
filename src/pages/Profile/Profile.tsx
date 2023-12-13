import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { Action } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { BsBookmarkHeart, BsGrid3X3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import AllPosts from "../../components/Post/AllPosts";
import { fetchProfileDetails } from "../../store/slices/profileSlice";
import { RootState } from "../../store/store";
import { State } from "../../types/types";

interface Profile {
  username: string;
  fullName: string;
  email: string;
  profilePhoto: string;
  posts: string;
  followers: [];
  following: [];
}

export interface AllPostsProps {
  isProfile: boolean;
  isFriend: boolean;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const { user, status, error } = useSelector(
    (state: RootState) => state.profile
  );

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  const renderContent = () => {
    if (status === "loading") {
      return (
        <div className="flex items-center justify-center ml-[500px] mb-[100px]">
          <CircularProgress size={100} />
        </div>
      );
    }
    if (status === "failed") {
      return (
        <div className="flex items-center justify-center">
          <Alert severity="error">Error: {error}</Alert>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center ml-[100px] ">
        <div className="flex mt-10 gap-10">
          <div className="profile-photo-container">
            {user.profilePhoto !== null ? (
              <img
                src={`data:image/jpeg;base64,${user.profilePhoto}`}
                alt="Profile Photo"
                className="rounded-full w-[140px] h-[140px] object-cover"
              />
            ) : (
              <div className="w-[140px] h-[140px] rounded-[50%] bg-slate-200"></div>
            )}
          </div>
          <div className="flex flex-col items-start gap-5">
            <div className="flex ">
              <p className="text-lg w-[80px]">{user.username}</p>
              <NavLink
                className="ml-[50px] bg-[#ebebeb] hover:bg-[#dbdbdb] font-medium py-1 px-20 rounded-lg"
                to={"/profile/edit"}
              >
                Edit profile
              </NavLink>
            </div>
            <div className="flex gap-[56px]">
              <p>
                <span className="font-semibold">{user?.posts?.length}</span>{" "}
                posts
              </p>
              <p>
                <span className="font-semibold">{user?.followers?.length}</span>{" "}
                followers
              </p>
              <p>
                <span className="font-semibold">{user?.following?.length}</span>{" "}
                following
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">{user.fullName}</p>
              <p className="text-sm font-semibold">{user.email}</p>
            </div>
          </div>
        </div>
        <hr className="w-[800px] border-t-[1.5px] border-[#dbdbdb] mt-10 mx-auto" />
        <div className="flex w-[800px] mt-10 mx-auto items-center justify-around">
          <div className="flex items-center gap-2 cursor-pointer">
            <p>
              <BsGrid3X3 />
            </p>
            <p>POSTS</p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <p>
              <BsBookmarkHeart />
            </p>
            <p>FAVORITES</p>
          </div>
        </div>
        <div
          className="flex items-center justify-start gap-5 mt-5
        "
        >
          <AllPosts isProfile={true} isFriend={false} />
        </div>
        <div className="mt-[30px] mb-[30px] self-center">
          <div className="posts"></div>
          <p className="text-center text-sm text-[#aeaeae]">
            © 2023 Instagram Clone from The Company
          </p>
          <p className="text-center text-sm text-[#aeaeae]">
            Created by: Ali Ramazanov & Mirjabbar Badalov
          </p>
        </div>
      </div>
    );
  };

  return <div className="flex justify-center">{renderContent()}</div>;
};

export default Profile;
