import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AllPostsProps } from "../../pages/Profile/Profile";
import { RootState } from "../../store/store";
import { PostData } from "../../types/types";
import Post from "./Post";

const AllPosts: React.FC<AllPostsProps> = ({
  isProfile,
  isFriend,
  isFavorite,
}) => {
  const [allPosts, setAllPosts] = useState<PostData[]>([]);

  const { user } = useSelector((state: RootState) => state.profile);
  const { friend } = useSelector((state: RootState) => state.friend);

  async function getAllPosts() {
    try {
      const data = await fetch(
        "https://instagram-api-88fv.onrender.com/api/posts"
      );
      const response = await data.json();

      if (isProfile) {
        const filteredPosts = response.filter(
          (post: { user: { _id: string | null } }) => {
            return post.user._id == user.id;
          }
        );
        setAllPosts(filteredPosts);
      } else if (isFriend) {
        const filteredPosts = response.filter(
          (post: { user: { _id: string | null } }) => {
            return post.user._id === friend.id;
          }
        );
        setAllPosts(filteredPosts);
      } else {
        const filteredPosts = response.filter(
          (post: { user: { _id: string | null } }) => {
            return post.user._id !== user.id;
          }
        );
        setAllPosts(filteredPosts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    if (user.id !== null) {
      getAllPosts();
    }
  }, [user.id]);

  const reversedPosts = [...allPosts].reverse();
  return (
    <div
      className={
        isProfile || isFriend
          ? " flex flex-row items-center justify-start gap-5 mt-5  flex-wrap ml-10"
          : "flex flex-col gap-5 py-6"
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
