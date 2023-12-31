import { Action } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { GoHome, GoHomeFill } from "react-icons/go";
import { HiOutlinePaperAirplane, HiPaperAirplane } from "react-icons/hi";
import { RiStackFill, RiStackLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { fetchProfileDetails } from "../../store/slices/profileSlice";
import { RootState } from "../../store/store";
import { State } from "../../types/types";
import logo from "/logo.svg";
import { Skeleton } from "@mui/material";

export default function Sidebar() {
  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const { user, status } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);
  const location = useLocation();

  const isNavLinkActive = (paths: string[]) => {
    return paths.some((path) => {
      const pathSegments = path.split("/").filter(Boolean);
      const locationSegments = location.pathname.split("/").filter(Boolean);

      if (pathSegments.length !== locationSegments.length) {
        return false;
      }

      return pathSegments.every((segment, index) => {
        return segment === "*" || segment === locationSegments[index];
      });
    });
  };

  return (
    <div className="flex flex-col justify-evenly min-w-[200px] ml-5 max-h-[60vh] sticky top-0 border-r min-h-screen">
      <NavLink className="flex items-center gap-3 mt-10 mb-4 ml-3" to={"/feed"}>
        <img
          src={logo as unknown as string}
          alt="Instagram Logo"
          className="w-[120px]"
        />
      </NavLink>

      <NavLink
        className={`flex items-center gap-3 p-3 mr-4 ${
          isNavLinkActive(["/feed"]) ? "text-black-500 font-bold" : ""
        } hover:bg-[#f2f2f2] hover:rounded-md `}
        to="/feed"
      >
        <div className="text-[28px] ">
          {isNavLinkActive(["/feed"]) ? (
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
          isNavLinkActive(["/favourites"])
            ? "text-black-500 font-bold !important"
            : ""
        }hover:bg-[#f2f2f2] hover:rounded-md `}
        to={"/favourites"}
      >
        <div className="text-[28px]">
          {isNavLinkActive(["/favourites"]) ? (
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
          isNavLinkActive(["/messages", "/chats", "/chats/*"])
            ? "text-black-500 font-bold !important"
            : ""
        } hover:bg-[#f2f2f2] hover:rounded-md `}
        to={"/messages"}
      >
        <div className="text-[28px]">
          {isNavLinkActive(["/messages", "/chats", "/chats/:*"]) ? (
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
          isNavLinkActive(["/profile"])
            ? "text-black-500 font-bold !important"
            : ""
        }hover:bg-[#f2f2f2] hover:rounded-md `}
        to={"/profile"}
      >
        <div className="text-[28px]">
          {status === "loading" ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={30}
              height={30}
            />
          ) : (
            <img
              src={`data:image/jpeg;base64,${user.profilePhoto}`}
              alt="Profile Photo"
              className="rounded-full w-[30px] h-[30px] object-cover"
            />
          )}
        </div>
        <p>Profile</p>
      </NavLink>
      <NavLink
        className={`flex items-center gap-3 p-3 mr-4 ${
          isNavLinkActive(["/more"])
            ? "text-black-500 font-bold !important"
            : ""
        }hover:bg-[#f2f2f2] hover:rounded-md `}
        to={"/more"}
      >
        <div className="text-[28px]">
          {isNavLinkActive(["/more"]) ? (
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
