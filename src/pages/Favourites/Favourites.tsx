import { CircularProgress } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import { RootState } from "../../store/store";
import { PostData } from "../../types/types";

function Favourites() {
  const [favoritePosts, setFavoritePosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: RootState) => state.profile);

  const getFavoritePosts = useCallback(async () => {
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
      setError("Error fetching posts");
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    getFavoritePosts();
  }, [getFavoritePosts]);

  console.log(user.id);
  console.log(favoritePosts);

  return (
    <div>
      <h1 className="text-2xl mb-4 mt-10 ml-32">
        Take a look at your favourites:
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-5 py-6 ml-[150px] w-[90%] flex-wrap">
          {loading && (
            <div className="ml-48 mt-20">
              <CircularProgress size={70} />
            </div>
          )}
          {error && <p className="ml-[150px] text-lg text-red-500">{error}</p>}
          {!loading && !error && favoritePosts.length === 0 && (
            <p className="ml-[150px] text-lg">No favorite posts found.</p>
          )}
          {!loading &&
            !error &&
            favoritePosts.length > 0 &&
            favoritePosts.map((post) => (
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
      </div>
    </div>
  );
}

export default Favourites;
