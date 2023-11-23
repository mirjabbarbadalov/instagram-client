import { useEffect, useState } from "react";
import { CiHeart, CiChat1, CiLocationArrow1, CiBookmark } from "react-icons/ci";

function Post() {
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
      <div className="">
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
            src="https://picsum.photos/id/244/900/900"
            onDoubleClick={() => {
              triggerDoubleClick(likes);
            }}
          />
          {isDoubleClick && (
            <div className="select-none absolute top-[30%] left-[35%] flex items-center justify-center text-[100px] animate-fly-away">
              ❤️
            </div>
          )}
          <div className="flex items-center justify-between mx-4 mt-3 mb-2">
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
          <div className="font-semibold text-sm mx-4 mt-2 mb-4">{likes}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
