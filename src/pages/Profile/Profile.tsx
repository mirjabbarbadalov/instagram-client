import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BsBookmarkHeart, BsGrid3X3 } from "react-icons/bs";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function takeToken() {
      const token = Cookies.get("token");

      if (token) {
        const apiUrl = `https://instagram-api-88fv.onrender.com/api/users`;

        try {
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.error("Failed to fetch user information");
          }
        } catch (error) {
          console.error("Error fetching user information:", error);
        }
      }
    }

    takeToken();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center mt-10 gap-10">
        <div className="w-[160px] h-[160px] rounded-[50%] bg-slate-200"></div>
        <div className="flex flex-col items-start gap-5">
          <div className="flex ">
            <p className="text-lg">{user}</p>
            <button
              type="submit"
              className="ml-[30px] bg-[#ebebeb] hover:bg-[#dbdbdb] font-medium py-1 px-4 rounded-lg"
            >
              Edit profile
            </button>
            <button
              type="button"
              className="ml-[10px] bg-[#ebebeb] hover:bg-[#dbdbdb] font-medium py-1 px-4 rounded-lg "
            >
              View profile
            </button>
          </div>
          <div className="flex gap-[56px]">
            <p>
              <span className="font-semibold">20</span> posts
            </p>
            <p>
              <span className="font-semibold">200</span> followers
            </p>
            <p>
              <span className="font-semibold">200</span> following
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Mirjabbar Badalov</p>
          </div>
        </div>
      </div>
      <hr className="w-[800px] border-t-[1.5px] border-[#dbdbdb] mt-10 mx-auto" />
      <div className="flex w-[800px] mt-10 mx-auto items-center justify-around">
        <div className="flex items-center gap-2 cursor-pointer">
          <p>
            <BsGrid3X3 />
          </p>
          <p>POSTS</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <p>
            <BsBookmarkHeart />
          </p>
          <p>FAVORITES</p>
        </div>
      </div>
    </div>
  );
}
