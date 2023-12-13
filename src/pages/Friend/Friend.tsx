import React, { useEffect, useState } from "react";
import { Action } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { FetchFriendDetails } from "../../store/slices/friendSlice";
import { RootState } from "../../store/store";
import { State } from "../../types/types";
import { BsBookmarkHeart, BsGrid3X3 } from "react-icons/bs";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import AllPosts from "../../components/Post/AllPosts";

interface Friend {
  username: string;
  fullName: string;
  email: string;
  profilePhoto: string;
  posts: [];
  followers: [];
  following: [];
  id: string;
}

interface Follower {
  id: string;
  username: string;
}

const Friend: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();

  const currentId = useSelector((state: RootState) => {
    return state.profile.user.id;
  });

  const username = useSelector((state: RootState) => {
    return state.profile.user.username;
  });

  const [followed, setFollowed] = useState<boolean>(false);

  const { friend, status, error } = useSelector(
    (state: RootState) => state.friend
  );

  const url = window.location.href;
  const urlParts = url.split("/");
  const desiredValue = urlParts[urlParts.length - 1];

  useEffect(() => {
    dispatch(FetchFriendDetails(desiredValue));
  }, [dispatch, desiredValue]);

  console.log(friend);
  console.log(friend.followers);
  console.log(currentId);

  useEffect(() => {
    console.log("Friend:", friend);
    console.log("Current ID:", currentId);

    const friendsId: string[] = friend.followers.map(
      (follower: Follower) => follower.id
    );

    if (friend && friend.followers && currentId) {
      if (friendsId.includes(currentId)) {
        setFollowed(true);
      }
    }
  }, [friend, currentId]);

  console.log(followed);

  const renderContent = () => {
    if (status === "loading") {
      return (
        <div className="flex items-center justify-center ml-[400px] mb-[100px]">
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

    async function followUser(username: string, usernameToFollow: string) {
      await fetch("https://instagram-api-88fv.onrender.com/users/follow", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({ username, usernameToFollow }),
      });
    }
    async function unFollowUser(username: string, usernameToUnfollow: string) {
      await fetch("https://instagram-api-88fv.onrender.com/users/unfollow", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({ username, usernameToUnfollow }),
      });
    }
    async function triggerFollow() {
      if (username && friend.username && followed) {
        await unFollowUser(username, friend.username);
        setFollowed(false);
      } else if (username && friend.username) {
        await followUser(username, friend.username);
        setFollowed(true);
      }
    }

    return (
      <div className="flex flex-col items-center ml-[100px] ">
        <div className="flex mt-10 gap-10">
          <div className="profile-photo-container">
            {friend.profilePhoto !== null ? (
              <img
                src={`data:image/jpeg;base64,${friend.profilePhoto}`}
                alt="Profile Photo"
                className="rounded-full w-[140px] h-[140px] object-cover"
              />
            ) : (
              <div className="w-[140px] h-[140px] rounded-[50%] bg-slate-200"></div>
            )}
          </div>
          <div className="flex flex-col items-start gap-5">
            <div className="flex ">
              <p className="text-lg w-[80px]">{friend.username}</p>
              <button
                className="ml-[50px] bg-[#ebebeb] hover:bg-[#dbdbdb] font-medium py-1 px-20 rounded-lg"
                onClick={() => {
                  triggerFollow();
                }}
              >
                {followed ? <p>Unfollow</p> : <p>Follow</p>}
              </button>
            </div>
            <div className="flex gap-[56px]">
              <p>
                <span className="font-semibold">{friend.posts.length}</span>{" "}
                posts
              </p>
              <p>
                <span className="font-semibold">{friend.followers.length}</span>{" "}
                followers
              </p>
              <p>
                <span className="font-semibold">{friend.following.length}</span>{" "}
                following
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">{friend.fullName}</p>
              <p className="text-sm font-semibold">{friend.email}</p>
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
          <AllPosts isProfile={false} isFriend={true} />
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

export default Friend;
