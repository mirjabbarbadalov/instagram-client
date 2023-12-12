import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { PostData } from "../../types/types";
import Post from "./Post";

function AllPosts() {
  const [userId, setUserId] = useState<string | null>(null);
  const [allPosts, setAllPosts] = useState<PostData[]>([]);

  async function getUserId() {
    try {
      const data = await fetch(
        "https://instagram-api-88fv.onrender.com/users/signedin",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const response = await data.json();

      const id = await response.id;
      setUserId(id);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  async function getAllPosts() {
    try {
      const data = await fetch(
        "https://instagram-api-88fv.onrender.com/api/posts"
      );
      console.log(1);
      const response = await data.json();
      console.log(response);
      console.log(response[0]?.user?._id);
      const filteredPosts = response.filter(
        (post: { user: { _id: string | null } }) => {
          return post.user._id !== userId;
        }
      );
      setAllPosts(filteredPosts);
      console.log(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      getAllPosts();
    }
  }, [userId]);

  return (
    <div className="flex flex-col gap-5 py-6">
      {allPosts.map((post) => (
        <Post key={post.title} postData={post} />
      ))}
    </div>
  );
}

export default AllPosts;
