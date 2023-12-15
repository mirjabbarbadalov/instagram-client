import { Skeleton } from "@mui/material";
import { Action } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { fetchProfileDetails } from "../../store/slices/profileSlice";
import { RootState } from "../../store/store";
import { State } from "../../types/types";

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const profilePhoto = useSelector(
    (state: RootState) => state.profile.user.profilePhoto
  );
  const status = useSelector((state: RootState) => state.profile.status);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else if (status === "succeeded" || status === "failed") {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfileDetails());
    }
  }, [status, dispatch]);

  function getCookie(name: string) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <div className="relative mt-3 mb-7 mr-10 cursor-pointer">
      <div className="user-menu flex justify-start">
        <button
          type="button"
          className={`relative bg-slate-100 rounded-full w-12 h-12 transition-transform ${
            isMenuOpen ? "scale-125" : ""
          }`}
          onClick={toggleMenu}
        >
          <span className="sr-only">User:</span>
          {loading ? (
            <Skeleton
              width={"49px"}
              height={"49px"}
              variant="circular"
              animation="wave"
            />
          ) : (
            <img
              src={`data:image/jpeg;base64,${profilePhoto}`}
              alt="Profile Photo"
              className="absolute inset-0  h-[50px] object-cover rounded-full w-[50px]"
            />
          )}

          {isMenuOpen && (
            <span
              onClick={toggleMenu}
              className="absolute top-2 right-3 cursor-pointer text-red-500 text-xl"
            >
              ❌
            </span>
          )}
        </button>

        {isMenuOpen && (
          <div
            className={
              "absolute -right-3 transform -translate-x-1/2 w-36 bg-white shadow-2xl rounded-md transition-opacity "
            }
          >
            <NavLink
              to="/profile"
              className="w-full text-center text-xs block py-2 text-gray-800 hover:bg-gray-200 rounded-tl-md rounded-tr-md"
              onClick={toggleMenu}
            >
              Profile
            </NavLink>
            <button
              type="button"
              className="cursor-pointer w-full text-xs block py-2 text-[#fa4970] hover:bg-gray-200 rounded-bl-md rounded-br-md"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMenu;
