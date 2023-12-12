import { useEffect, useState } from "react";
import Post from "./Post";
import { PostData } from "../../types/types";
import Cookies from "js-cookie";

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
      if (userId) {
        const data = await fetch(
          "https://instagram-api-88fv.onrender.com/api/posts"
        );
        const response = await data.json();
        const filteredPosts = response.filter(
          (post: { user: string }) => post.user !== userId
        );
        setAllPosts(filteredPosts);
      }
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
    <div className="flex flex-col gap-5 py-6 z-0">
      {allPosts.map((post) => (
        <Post key={post.title} postData={post} />
      ))}
    </div>
  );
}

export default AllPosts;
