import { NavLink, useLocation } from "react-router-dom";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { HiOutlinePaperAirplane, HiPaperAirplane } from "react-icons/hi";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import {
  RiAccountCircleLine,
  RiStackLine,
  RiAccountCircleFill,
  RiStackFill,
} from "react-icons/ri";
import logo from "/logo.svg";

export default function Sidebar() {
  const location = useLocation();

  const isNavLinkActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col gap-5 justify-between w-min ml-5 max-h-[60vh] sticky top-0">
      <NavLink className="flex items-center gap-3 mt-10 mb-3 ml-3" to={"/feed"}>
        <img
          src={logo as unknown as string}
          alt="Instagram Logo"
          className="w-[100px]"
        />
      </NavLink>

      <div className="border-s border-solid border-slate-300 h-screen absolute ml-[14.5vw] "></div>

      <NavLink
        className={`flex items-center gap-3 p-3 ${
          isNavLinkActive("/feed") ? "text-black-500" : ""
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
        className={`flex items-center gap-3 p-3 ${
          isNavLinkActive("/favourites") ? "text-black-500" : ""
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
        className={`flex items-center gap-3 p-3 ${
          isNavLinkActive("/messages") ? "text-black-500" : ""
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
        className={`flex items-center gap-3 p-3 ${
          isNavLinkActive("/notifications") ? "text-black-500" : ""
        }hover:bg-[#f2f2f2] hover:rounded-md `}
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
        className={`flex items-center gap-3 p-3 ${
          isNavLinkActive("/profile") ? "text-black-500" : ""
        }hover:bg-[#f2f2f2] hover:rounded-md `}
        to={"/profile"}
      >
        <div className="text-[28px]">
          {isNavLinkActive("/profile") ? (
            <RiAccountCircleFill
              className={"transform hover:scale-110 transition-transform"}
            />
          ) : (
            <RiAccountCircleLine
              className={"transform hover:scale-110 transition-transform"}
            />
          )}
        </div>
        <p>Profile</p>
      </NavLink>
      <NavLink
        className={`flex items-center gap-3 p-3 ${
          isNavLinkActive("/more") ? "text-black-500" : ""
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
