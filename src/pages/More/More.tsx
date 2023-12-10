import { IoMdPersonAdd } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Message from "../../test/Messaging/Messaging";
import Test from "../../test/Test";

export default function More() {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <NavLink to={"/register"}>
        <IoMdPersonAdd className="text-[40px]" />
        Register
      </NavLink>
      <Test />
      <Message />
    </div>
  );
}
