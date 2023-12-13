import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import { PostData } from "../../types/types";
import Cookies from "js-cookie";

function Favourites() {
  const [favoritePosts, setFavoritePosts] = useState<PostData[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  async function getFavoritePosts() {
    try {
      const data = await fetch(
        "https://instagram-api-88fv.onrender.com/api/posts"
      );
      const response = await data.json();

      const userLikedPosts = response.filter(
        (post: { likes: (string | null)[] }) => post.likes.includes(userId)
      );

      setFavoritePosts(userLikedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

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

  useEffect(() => {
    getUserId();
    getFavoritePosts();
  }, [favoritePosts]);

  return (
    <div className="flex flex-col gap-5 py-6 ml-[150px]">
      {!favoritePosts.length && (
        <p className="ml-[150px] text-lg">You don't have favorite posts.</p>
      )}
      {favoritePosts.map((post) => (
        <Post
          key={post.title}
          postData={post}
          isFriend={false}
          isProfile={false}
        />
      ))}
    </div>
  );
}

export default Favourites;
