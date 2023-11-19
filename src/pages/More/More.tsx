import { NavLink } from "react-router-dom";
import { RiLoginCircleFill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
export default function More() {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <NavLink to={"/login"}>
        <RiLoginCircleFill className="text-[35px]" />
        Login
      </NavLink>
      <NavLink to={"/register"}>
        <IoMdPersonAdd className="text-[40px]" />
        Register
      </NavLink>
    </div>
  );
}
