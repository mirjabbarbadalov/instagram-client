import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { CiBookmark, CiChat1, CiHeart, CiLocationArrow1 } from "react-icons/ci";
import { RiHeartFill } from "react-icons/ri";
import { PostData } from "../../types/types";
import ModalComponent from "./ModalComponent";

interface PostProps {
  postData: PostData;
}

function Post({ postData }: PostProps) {
  const initialLikes = postData.likes.length;
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const retrievedUserId = await getUserId();
        setUserId(retrievedUserId);
        if (postData.likes.includes(retrievedUserId)) {
          setIsLiked(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [postData]);

  function triggerLike(likes: number) {
    const updatedLikes = isLiked ? likes - 1 : likes + 1;
    setLikes(updatedLikes);
    setIsLiked(!isLiked);
    likePostWithApi(userId);
  }

  function triggerDoubleClick(likes: number) {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
      setIsDoubleClick(true);
      likePostWithApi(userId);
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
      const id = response.id;
      return id;
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  async function likePostWithApi(userId: string | null) {
    try {
      const data = await fetch(
        `https://instagram-api-88fv.onrender.com/api/posts/${postData._id}/like`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
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

  async function addCommentToPost(
    userId: string | null,
    comment: string | null
  ) {
    try {
      const data = await fetch(
        `https://instagram-api-88fv.onrender.com/api/posts/${postData._id}/comment`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({ userId, comment }),
        }
      );
      const response = await data.json();
      console.log(response);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="relative">
        <div className="bg-white border-b rounded-sm max-w-md">
          <div className="flex items-center px-1 py-3">
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
            <div className="select-none absolute top-[25%] left-[35%] flex items-center justify-center text-[100px] animate-fly-away">
              ❤️
            </div>
          )}
          <div className="flex items-center justify-between my-2">
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
          <div className="font-semibold px-1">{postData.title}</div>
          {postData.comments.length > 0 && (
            <div
              className=" text-slate-700 cursor-pointer"
              onClick={() => {
                openModal();
              }}
            >
              <p className="text-sm px-1">
                View all {postData.comments.length} comments
              </p>
            </div>
          )}

          <div className="w-[95%] h-[30px] mx-1">
            <input
              className="w-[100%] text-sm outline-none text-black"
              type="text"
              name="comment"
              id="comment"
              placeholder="Add a comment..."
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
            />
            {comment && (
              <button
                type="button"
                className="text-sm font-bold text-[#0095f6]"
                onClick={() => {
                  addCommentToPost(userId, comment);
                  setComment("");
                }}
              >
                Post
              </button>
            )}
          </div>
          <div className="font-semibold text-sm mx-1 mt-0 mb-4">
            {likes} likes
          </div>
        </div>
      </div>

      <ModalComponent
        showModal={showModal}
        onClose={closeModal}
        postData={postData}
        isLiked={isLiked}
        userId={userId}
        triggerLike={triggerLike}
      />
    </div>
  );
}

export default Post;
