import { NavLink } from "react-router-dom";
import { BsBookmarkHeart } from "react-icons/bs";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiAccountCircleLine, RiStackLine } from "react-icons/ri";
import { GoHome } from "react-icons/go";
import logo from "../../../public/logo.svg";

function Sidebar() {
  return (
    <div className="flex flex-col gap-5 justify-between w-min">
      <NavLink className="flex items-center gap-3 mb-5" to={"/feed"}>
        <div className="text-[30px]">
          <img src={logo} alt="Logo" />
        </div>
      </NavLink>
      <NavLink className="flex items-center gap-3 mb-5" to={"/feed"}>
        <div className="text-[30px]">
          <GoHome />
        </div>
        <p>Home</p>
      </NavLink>
      <NavLink className="flex items-center gap-3 mb-5" to={"/favourites"}>
        <div className="text-[30px]">
          <BsBookmarkHeart />
        </div>
        <p>Favourites</p>
      </NavLink>
      <NavLink className="flex items-center gap-3 mb-5" to={"/messages"}>
        <div className="text-[30px]">
          <HiOutlinePaperAirplane />
        </div>
        <p>Messages</p>
      </NavLink>
      <NavLink className="flex items-center gap-3 mb-5" to={"/notifications"}>
        <div className="text-[30px]">
          <IoMdNotificationsOutline />
        </div>
        <p>Notifications</p>
      </NavLink>
      <NavLink className="flex items-center gap-3 mb-5" to={"/profile"}>
        <div className="text-[30px]">
          <RiAccountCircleLine />
        </div>
        <p>Profile</p>
      </NavLink>
      <NavLink className="flex items-center gap-3 mb-5" to={"/more"}>
        <div className="text-[30px]">
          <RiStackLine />
        </div>
        <p>More</p>
      </NavLink>
    </div>
  );
}

export default Sidebar;
