import { useEffect, useState } from "react";
import { CiHeart, CiChat1, CiLocationArrow1, CiBookmark } from "react-icons/ci";
import { PostData } from "../../types/types";
interface PostProps {
  postData: PostData;
}

function Post({ postData }: PostProps) {
  const [likes, setLikes] = useState(25);
  const [isLiked, setIsLiked] = useState(false);
  const [isDoubleClick, setIsDoubleClick] = useState(false);

  function triggerLike(likes: number) {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  }

  function triggerDoubleClick(likes: number) {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
      setIsDoubleClick(true);
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

  return (
    <div>
      <div className="relative">
        <div className="bg-white border rounded-sm max-w-md">
          <div className="flex items-center px-4 py-3">
            <img
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
            src={postData.postUrl}
            onDoubleClick={() => {
              triggerDoubleClick(likes);
            }}
          />
          {isDoubleClick && (
            <div className="select-none absolute top-[30%] left-[35%] flex items-center justify-center text-[100px] animate-fly-away">
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
                <CiHeart />
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
