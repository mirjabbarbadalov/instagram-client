import { CircularProgress, Skeleton } from "@mui/material";
import { Action } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AllPostsProps } from "../../pages/Profile/Profile";
import { fetchAllPosts } from "../../store/slices/postsSlice";
import { RootState } from "../../store/store";
import { PostData } from "../../types/types";
import Post from "./Post";
import ModalComponent from "./ModalComponent";

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

  const [loading, setLoading] = useState(true);
  const [reversedPosts, setReversedPosts] = useState<PostData[]>([]);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (user.id !== null) {
      dispatch(fetchAllPosts());
    }
  }, [user.id, dispatch]);

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
    let Loader;
    if (isProfile || isFriend) {
      Loader = <CircularProgress />;
    } else {
      Loader = (
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
            <Skeleton
              animation="wave"
              height={20}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={20}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={20}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={20} width="80%" />
          </div>
        </div>
      );
      return Loader;
    }
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={
        isProfile || isFriend
          ? "grid grid-cols-3 gap-5 mt-5 ml-10 z-10 w-[1000px]"
          : "flex flex-col gap-5 py-6 z-10"
      }
    >
      {reversedPosts.map((post, index) => (
        <div key={index}>
          <Post
            index={index}
            postData={post}
            isProfile={isProfile}
            isFriend={isFriend}
            isFavorite={isFavorite}
            onClick={() => setSelectedPostIndex(index)}
          />
          {selectedPostIndex === index && (
            <ModalComponent
              index={index}
              showModal={selectedPostIndex !== null}
              onClose={() => setSelectedPostIndex(null)}
              postData={post}
              isLiked={false}
              userId={null}
              triggerLike={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
