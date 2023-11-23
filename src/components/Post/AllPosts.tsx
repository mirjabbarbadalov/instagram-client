import { useEffect, useState } from "react";
import Post from "./Post";
import { PostData } from "../../types/types";

function AllPosts() {
  const [allPosts, setAllPosts] = useState<PostData[]>([]);

  async function getAllPosts() {
    try {
      const data = await fetch(
        "https://instagram-api-88fv.onrender.com/api/posts"
      );
      const response = await data.json();
      setAllPosts(response);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="flex flex-col gap-5 py-6">
      {allPosts.map((post) => (
        <Post key={post.title} postData={post} />
      ))}
    </div>
  );
}

export default AllPosts;
