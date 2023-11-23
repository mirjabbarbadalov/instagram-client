import { NavLink, useNavigate } from "react-router-dom";
import { RiLoginCircleFill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { useEffect, useState } from "react";

export default function More() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie("token");
    setIsLoggedIn(!!token);
  }, []);

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

  function handleLogout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      {isLoggedIn ? (
        <button onClick={handleLogout}>
          <RiLoginCircleFill className="text-[35px]" />
          Logout
        </button>
      ) : (
        <NavLink to={"/login"}>
          <RiLoginCircleFill className="text-[35px]" />
          Login
        </NavLink>
      )}
      <NavLink to={"/register"}>
        <IoMdPersonAdd className="text-[40px]" />
        Register
      </NavLink>
    </div>
  );
}
