import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { CiBookmark, CiChat1, CiHeart, CiLocationArrow1 } from "react-icons/ci";
import { BsFillChatFill } from "react-icons/bs";
import { RiHeartFill } from "react-icons/ri";
import { PostData } from "../../types/types";
import ModalComponent from "./ModalComponent";
import { NavLink } from "react-router-dom";

interface PostProps {
  postData: PostData;
  isProfile: boolean;
  isFriend: boolean;
  isFavorite: boolean;
}

function Post({ postData, isProfile, isFriend, isFavorite }: PostProps) {
  const initialLikes = postData.likes.length;
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [isHover, setIsHover] = useState(false);
  const [hoveredPhoto, setHoveredPhot] = useState<string | unknown>("");

  const firstComment = postData?.comments[0]?.comment;
  const firstCommentBy = postData?.comments[0]?.user?.username;

  const userName = postData?.user?.username;
  const profilePhoto = postData?.user?.profilePhoto;

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

  useEffect(() => {
    if (isDoubleClick) {
      const delay = 2000;

      const timeout = setTimeout(() => {
        setIsDoubleClick(false);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [isDoubleClick]);

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

  const handleMouseOver = (postId: string | unknown) => {
    if (typeof postId === "string") {
      setIsHover(true);
      setHoveredPhot(postId);
    }
  };

  const handleMouseOut = () => {
    setIsHover(false);
  };

  return (
    <>
      {isProfile || isFriend || isFavorite ? (
        <div
          key={postData.title}
          className=" flex flex-row gap-8 text-white text-2xl opacity-100 w-[300px] h-[300px] relative cursor-pointer"
          onMouseOver={() => {
            handleMouseOver(postData._id);
          }}
          onMouseOut={handleMouseOut}
          onClick={() => {
            openModal();
          }}
        >
          <img
            src={postData.postPhoto}
            alt="Post"
            className="w-[100%] h-[100%] object-cover"
          />
          {isHover && hoveredPhoto === postData._id && (
            <div
              // onClick={handleCommentClick}
              className="w-[300px] h-[300px] absolute  bg-black opacity-50 flex items-center justify-center gap-3 text-2xl text-white  top-0 left-0 z-0"
            >
              <div className="flex flex-row items-center justify-center gap-2 ">
                <RiHeartFill /> <span>{postData.likes.length}</span>
              </div>
              <div className="flex fill flex-row items-center justify-center gap-2">
                <BsFillChatFill />
                <span>{postData.comments.length}</span>
              </div>
            </div>
          )}
          <ModalComponent
            showModal={showModal}
            onClose={closeModal}
            postData={postData}
            isLiked={isLiked}
            userId={userId}
            triggerLike={triggerLike}
          />
        </div>
      ) : (
        <div className="z-0">
          <div className="relative">
            <div className="bg-white border-b rounded-sm max-w-md">
              <NavLink to={`/friend/${userName}`}>
                <div className="flex items-center px-1 py-3">
                  <img
                    src={`data:image/jpeg;base64,${profilePhoto}`}
                    alt="Profile Photo"
                    className="rounded-full w-[40px] h-[40px] object-cover"
                  />
                  <div className="ml-3 ">
                    <span className="text-sm font-semibold antialiased block leading-tight">
                      {userName}
                    </span>
                    <span className="text-gray-600 text-xs block">
                      Asheville, North Carolina
                    </span>
                  </div>
                </div>
              </NavLink>
              <img
                alt="post"
                src={postData.postPhoto}
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
                  <p
                    className="text-[32px] cursor-pointer"
                    onClick={() => {
                      openModal();
                    }}
                  >
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
              <div className="font-semibold text-sm mx-1 mt-0">
                {likes} likes
              </div>
              <div className="font-semibold px-1">{postData.title}</div>
              {postData.comments.length > 0 && (
                <div
                  className=" text-slate-700 cursor-pointer"
                  onClick={() => {
                    openModal();
                  }}
                >
                  <div className="flex gap-2">
                    {<p className="text-sm ml-1">{firstCommentBy}:</p>}
                    {<p className=" text-sm">{firstComment}</p>}
                  </div>
                  <p className="text-sm px-1">
                    View all {postData.comments.length} comments
                  </p>
                </div>
              )}
              <div className="w-[100%] h-[30px] mx-1 flex items-center justify-between">
                <input
                  className="w-[90%] text-sm outline-none text-black"
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
                    className="text-sm font-bold text-[#0095f6] mr-2"
                    onClick={() => {
                      addCommentToPost(userId, comment);
                      setComment("");
                    }}
                  >
                    Post
                  </button>
                )}
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
      )}
    </>
  );
}

export default Post;
