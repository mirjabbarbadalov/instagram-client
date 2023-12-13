import { useState } from "react";
import Cookies from "js-cookie";
import { CiHeart, CiChat1, CiLocationArrow1, CiBookmark } from "react-icons/ci";
import { RiHeartFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

interface ModalData {
  postData: any;
  showModal: boolean;
  onClose: () => void;
  isLiked: boolean;
  userId: string | null;
  triggerLike: (likes: number) => void;
}

const ModalComponent = ({
  showModal,
  onClose,
  postData,
  isLiked,
  userId,
  triggerLike,
}: ModalData) => {
  const [comment, setComment] = useState("");
  const initialLikes = postData.likes.length;
  const likes = initialLikes;

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
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-30   ${
        showModal
          ? "bg-black bg-opacity-60 opacity-100 "
          : "opacity-0 pointer-events-none"
      }`}
      onClick={() => {
        showModal && onClose();
      }}
    >
      <div
        className="bg-white w-full max-w-3xl mx-4 md:mx-auto rounded-lg overflow-hidden shadow-lg flex h-[500px] relative z-40"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="w-[700px]">
          <img
            src={postData.postUrl}
            alt="Sample"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[400px] p-4 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 ">{postData.title}</h2>
          {postData.comments.map(
            (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data: { user: any; comment: string; _id: string },
              index: number
            ) => (
              <div className="mb-2 flex" key={index}>
                <p className="font-medium">{data.user.username} </p>
                <p className="text-gray-700 ml-2">{data.comment}</p>
              </div>
            )
          )}

          <div className="absolute bottom-2 text-black">
            <div className=" w-[300px] justify-end  ">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-3">
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
                <div className="flex ml-4">
                  <p className="text-[32px] cursor-pointer">
                    <CiBookmark />
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[300px] h-[30px] mx-auto  ">
              <input
                className="w-[90%]  text-sm outline-none text-black"
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
          </div>
        </div>
        <div
          onClick={onClose}
          className="cursor-pointer font mt-5 mr-5 text-3xl text-black"
        >
          <IoClose />
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
