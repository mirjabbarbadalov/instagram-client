import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { GoHome, GoHomeFill } from "react-icons/go";
import { HiOutlinePaperAirplane, HiPaperAirplane } from "react-icons/hi";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { RiStackFill, RiStackLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import logo from "/logo.svg";
import { useEffect } from "react";
import { fetchProfileDetails } from "../../store/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { State } from "../../types/types";
import { Action } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export default function Sidebar() {
  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const { user } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);
  const location = useLocation();

  const isNavLinkActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col justify-evenly min-w-[200px] ml-5 max-h-[60vh] sticky top-0 border-r min-h-screen">
      <NavLink className="flex items-center gap-3 mt-10 mb-4 ml-3" to={"/feed"}>
        <img
          src={logo as unknown as string}
          alt="Instagram Logo"
          className="w-[150px]"
        />
      </NavLink>

      <NavLink
        className={`flex items-center gap-3 p-3 mr-4 ${
          isNavLinkActive("/feed") ? "text-black-500 font-bold" : ""
        } hover:bg-[#f2f2f2] hover:rounded-md `}
        to="/feed"
      >
        <div className="text-[28px] ">
          {isNavLinkActive("/feed") ? (
            <GoHomeFill
              className={"transform hover:scale-110 transition-transform"}
            />
          ) : (
            <GoHome
              className={"transform hover:scale-110 transition-transform"}
            />
          )}
        </div>
        <p>Home</p>
      </NavLink>
      <NavLink
        className={`flex items-center gap-3 p-3 mr-4 ${
          isNavLinkActive("/favourites")
            ? "text-black-500 font-bold !important"
            : ""
        }hover:bg-[#f2f2f2] hover:rounded-md `}
        to={"/favourites"}
      >
        <div className="text-[28px]">
          {isNavLinkActive("/favourites") ? (
            <BsBookmarkHeartFill
              className={"transform hover:scale-110 transition-transform"}
            />
          ) : (
            <BsBookmarkHeart
              className={"transform hover:scale-110 transition-transform"}
            />
          )}
        </div>
        <p>Favourites</p>
      </NavLink>
      <NavLink
        className={`flex items-center gap-3 p-3 mr-4 ${
          isNavLinkActive("/messages")
            ? "text-black-500 font-bold !important"
            : ""
        } hover:bg-[#f2f2f2] hover:rounded-md `}
        to={"/messages"}
      >
        <div className="text-[28px]">
          {isNavLinkActive("/messages") ? (
            <HiPaperAirplane
              className={"transform hover:scale-110 transition-transform"}
            />
          ) : (
            <HiOutlinePaperAirplane
              className={"transform hover:scale-110 transition-transform"}
            />
          )}
        </div>
        <p>Messages</p>
      </NavLink>
      <NavLink
        className={`flex items-center gap-3 p-3 mr-4 ${
          isNavLinkActive("/notifications")
            ? "text-black-500 font-bold !important"
            : ""
        } hover:bg-[#f2f2f2] hover:rounded-md `}
        to={"/notifications"}
      >
        <div className="text-[28px]">
          {isNavLinkActive("/notifications") ? (
            <IoMdNotifications
              className={"transform hover:scale-110 transition-transform"}
            />
          ) : (
            <IoMdNotificationsOutline
              className={"transform hover:scale-110 transition-transform"}
            />
          )}
        </div>
        <p>Notifications</p>
      </NavLink>
      <NavLink
        className={`flex items-center gap-3 p-3 mr-4 ${
          isNavLinkActive("/profile")
            ? "text-black-500 font-bold !important"
            : ""
        }hover:bg-[#f2f2f2] hover:rounded-md `}
        to={"/profile"}
      >
        <div className="text-[28px]">
          <img
            src={`data:image/jpeg;base64,${user.profilePhoto}`}
            alt="Profile Photo"
            className="rounded-full w-[30px] h-[30px] object-cover"
          />
        </div>
        <p>Profile</p>
      </NavLink>
      <NavLink
        className={`flex items-center gap-3 p-3 mr-4 ${
          isNavLinkActive("/more") ? "text-black-500 font-bold !important" : ""
        }hover:bg-[#f2f2f2] hover:rounded-md `}
        to={"/more"}
      >
        <div className="text-[28px]">
          {isNavLinkActive("/more") ? (
            <RiStackFill
              className={"transform hover:scale-110 transition-transform"}
            />
          ) : (
            <RiStackLine
              className={"transform hover:scale-110 transition-transform"}
            />
          )}
        </div>
        <p>More</p>
      </NavLink>
    </div>
  );
}
