import { Action } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AllPostsProps } from "../../pages/Profile/Profile";
import { fetchAllPosts } from "../../store/slices/postsSlice";
import { RootState } from "../../store/store";
import { PostData } from "../../types/types";
import { Skeleton } from "@mui/material";
import Post from "./Post";

const AllPosts: React.FC<AllPostsProps> = ({
  isProfile,
  isFriend,
  isFavorite,
}) => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const { user } = useSelector((state: RootState) => state.profile);
  const { friend } = useSelector((state: RootState) => state.friend);
  const { allPosts, status, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    if (user.id !== null) {
      dispatch(fetchAllPosts());
    }
  }, [user.id, dispatch]);

  const [loading, setLoading] = useState(true);
  const [reversedPosts, setReversedPosts] = useState<PostData[]>([]);

  useEffect(() => {
    if (status === "succeeded") {
      const filteredPosts = isProfile
        ? allPosts.filter((post) => post.user._id === user.id)
        : isFriend
        ? allPosts.filter((post) => post.user._id === friend.id)
        : allPosts.filter((post) => post.user._id !== user.id);

      const reversedPosts = [...filteredPosts].reverse();

      setReversedPosts(reversedPosts);

      setLoading(false);
    }
  }, [status, isProfile, isFriend, user.id, friend.id, allPosts]);

  if (loading) {
    return (
      <div className="w-[400px] mt-10 ml-2">
        <div className="flex flex-col space-y-1">
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
          <Skeleton animation="wave" height={20} width="80%" />
          <Skeleton animation="wave" height={20} width="40%" />
          <Skeleton
            sx={{ height: 220 }}
            animation="wave"
            variant="rectangular"
          />
          <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={20} width="80%" />
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={
        isProfile || isFriend
          ? "flex flex-row items-center justify-start gap-5 mt-5 flex-wrap ml-10 z-0 w-[500px]"
          : "flex flex-col gap-5 py-6 z-0"
      }
    >
      {reversedPosts.map((post, index) => (
        <Post
          key={index}
          postData={post}
          isProfile={isProfile}
          isFriend={isFriend}
          isFavorite={isFavorite}
        />
      ))}
    </div>
  );
};

export default AllPosts;
