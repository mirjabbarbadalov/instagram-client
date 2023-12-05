import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BsGrid3X3 } from "react-icons/bs";
import { BsBookmarkHeart } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { Grid } from "../../components/Grid/Grid";
import { PostData } from "../../types/types";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [yourProfile, setYourProfile] = useState(true);
  const [usernameFromURL, setUsernameFromURL] = useState("");
  const [allPosts, setAllPosts] = useState<PostData[]>([]);

  const getUserDetails = async () => {
    fetch("https://instagram-api-88fv.onrender.com/users/signedin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
        setFullname(data.fullName);
        setEmail(data.email);
        console.log(data);
      });
  };

  useEffect(() => {
    const currentURL = window.location.href;

    const parts = currentURL.split("/");
    const username = parts[parts.length - 1];

    setUsernameFromURL(username);
  }, []);

  useEffect(() => {
    if (usernameFromURL !== "profile") {
      setYourProfile(false);
    } else {
      setYourProfile(true);
      getUserDetails();
    }
  }, [usernameFromURL]);

  const fetchImages = async () => {
    try {
      const data = await fetch(
        "https://instagram-api-88fv.onrender.com/api/posts"
      );
      const response = await data.json();
      setAllPosts(response);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const images = allPosts.map((post) => post.postUrl);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center mt-10 gap-10">
        <div className="w-[160px] h-[160px] rounded-[50%] bg-slate-200"></div>
        <div className="flex flex-col items-start gap-5">
          {yourProfile && (
            <div className="flex ">
              <p className="text-lg">{username}</p>
              <NavLink
                className="ml-[30px] bg-[#ebebeb] hover:bg-[#dbdbdb] font-medium py-1 px-4 rounded-lg"
                to={"/profile/edit"}
              >
                Edit profile
              </NavLink>
              <button
                type="button"
                className="ml-[10px] bg-[#ebebeb] hover:bg-[#dbdbdb] font-medium py-1 px-4 rounded-lg "
              >
                View profile
              </button>
            </div>
          )}
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
            <p className="text-sm font-semibold">{fullname}</p>
            {/* Delete Later */}
            <p className="text-sm font-semibold">Test: {email}</p>
            {/* Delete Later */}
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
      {images && images.length > 0 && <Grid images={images} />}
      <div className="mt-[30px] mb-[30px] self-center">
        <p className="text-center text-sm text-[#aeaeae]">
          © 2023 Instagram Clone from The Company
        </p>
        <p className="text-center text-sm text-[#aeaeae]">
          Created by: Ali Ramazanov, Mirjabbar Badalov, Azar Imranov
        </p>
      </div>
    </div>
  );
}
