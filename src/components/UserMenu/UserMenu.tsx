import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setIsMenuOpen(false);
    }
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <div className="user-menu-container relative mt-3 mb-7 m-8 cursor-pointer">
      <div className="user-menu flex justify-start">
        <button
          type="button"
          className={`relative bg-sky-500 rounded-full w-12 h-12 transition-transform ${
            isMenuOpen ? "scale-125" : ""
          }`}
          onClick={toggleMenu}
        >
          <span className="sr-only">User:</span>
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-full"
            src="/images/profile.jpg"
            alt=""
          />
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
