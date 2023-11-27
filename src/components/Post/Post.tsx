import { useEffect, useState } from "react";
import { CiHeart, CiChat1, CiLocationArrow1, CiBookmark } from "react-icons/ci";
import { RiHeartFill } from "react-icons/ri";

import { PostData } from "../../types/types";
interface PostProps {
  postData: PostData;
}

function Post({ postData }: PostProps) {
  const initialLikes = postData.likes.length;
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  function triggerLike(likes: number) {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
      likePostWithApi(userId);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
      likePostWithApi(userId);
    }
  }

  function triggerDoubleClick(likes: number) {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
      setIsDoubleClick(true);
      likePostWithApi(userId);
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isDoubleClick) {
      timer = setTimeout(() => {
        setIsDoubleClick(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isDoubleClick]);

  function getTokenFromCookie() {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");

      if (cookieName === "token") {
        return cookieValue;
      }
    }

    return null;
  }

  async function getUserId(token) {
    try {
      const data = await fetch(
        "https://instagram-api-88fv.onrender.com/users/signedin",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await data.json();
      const id = await response.id;
      return id;
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  async function fetchData() {
    try {
      const retrievedToken = getTokenFromCookie();
      const retrievedUserId = await getUserId(retrievedToken);
      setToken(retrievedToken);
      setUserId(retrievedUserId);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function likePostWithApi(userId) {
    try {
      console.log(postData._id);
      const data = await fetch(
        `https://instagram-api-88fv.onrender.com/api/posts/${postData._id}/like`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        }
      );
      const response = await data.json();
      console.log(response);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="relative">
        <div className="bg-white border rounded-sm max-w-md">
          <div className="flex items-center px-4 py-3">
            <img
              alt="post"
              className="h-8 w-8 rounded-full"
              src="https://picsum.photos/id/1027/150/150"
            />
            <div className="ml-3 ">
              <span className="text-sm font-semibold antialiased block leading-tight">
                8fact
              </span>
              <span className="text-gray-600 text-xs block">
                Asheville, North Carolina
              </span>
            </div>
          </div>
          <img
            alt="post"
            src={postData.postUrl}
            onDoubleClick={() => {
              triggerDoubleClick(likes);
            }}
          />
          {isDoubleClick && (
            <div className="select-none absolute top-[30%] left-[13%] flex items-center justify-center text-[100px] animate-fly-away">
              ❤️
            </div>
          )}
          <div className="mx-4 font-semibold">{postData.title}</div>
          <div className="flex items-center justify-between mx-4 mb-2">
            <div className="flex gap-5">
              <p
                className="text-[32px] cursor-pointer"
                onClick={() => {
                  triggerLike(likes);
                }}
              >
                {isLiked ? (
                  <p className="text-red-500">
                    <RiHeartFill />
                  </p>
                ) : (
                  <CiHeart />
                )}
              </p>
              <p className="text-[32px] cursor-pointer">
                <CiChat1 />
              </p>

              <p className="text-[32px] cursor-pointer">
                <CiLocationArrow1 />
              </p>
            </div>
            <div className="flex">
              <p className="text-[32px] cursor-pointer">
                <CiBookmark />
              </p>
            </div>
          </div>
          <div className="font-semibold text-sm mx-4 mt-2 mb-4">
            {likes} likes
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
