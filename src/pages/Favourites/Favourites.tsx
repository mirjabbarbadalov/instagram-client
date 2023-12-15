import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import { RootState } from "../../store/store";
import { PostData } from "../../types/types";

function Favourites() {
  const [favoritePosts, setFavoritePosts] = useState<PostData[]>([]);

  const { user } = useSelector((state: RootState) => state.profile);

  async function getFavoritePosts() {
    try {
      const data = await fetch(
        "https://instagram-api-88fv.onrender.com/api/posts"
      );
      const response = await data.json();

      const userLikedPosts = response.filter(
        (post: { likes: (string | null)[] }) => post.likes.includes(user.id)
      );

      setFavoritePosts(userLikedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    getFavoritePosts();
  }, [favoritePosts]);

  console.log(user.id);
  console.log(favoritePosts);

  return (
    <div className="flex flex-row gap-5 py-6 ml-[150px] w-[90%] flex-wrap">
      {!favoritePosts.length && (
        <p className="ml-[150px] text-lg">Your favorites are loading...</p>
      )}
      {favoritePosts.map((post) => (
        <Post
          key={post.title}
          postData={post}
          isFriend={false}
          isProfile={false}
          isFavorite={true}
          index={0}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ))}
    </div>
  );
}

export default Favourites;
