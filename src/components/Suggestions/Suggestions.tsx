import { useEffect, useState } from "react";
import { User } from "../../types/types";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

export default function Suggestions() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  async function getUserId() {
    try {
      const data = await fetch(
        "https://instagram-api-88fv.onrender.com/users/signedin",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const response = await data.json();
      const id = await response.id;
      setUserId(id);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  async function getAllUsers() {
    try {
      await getUserId();
      const response = await fetch(
        "https://instagram-api-88fv.onrender.com/users/all",
        {
          method: "GET",
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not in JSON format.");
      }

      const data = await response.json();

      const filteredUsers = data.users.filter(
        (user: User) => user.id !== userId
      );
      setAllUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log("ALLL USERS", allUsers);

  return (
    <div className="z-0">
      <p className="ml-[6px] mb-3 text-sm">Suggested for you:</p>
      <div className="w-[300px] max-h-[200px] overflow-auto p-3 border-l flex flex-col gap-1">
        {allUsers && allUsers.length > 0 ? (
          allUsers.map((user, index) => (
            <NavLink key={index} to={`/friend/${user.username}`}>
              <div className="flex items-center gap-2 cursor-pointer w-[100%]">
                <div className="">
                  {user.profilePhoto ? (
                    <img
                      className="rounded-full w-[40px] h-[40px] object-cover"
                      src={`data:image/jpeg;base64,${user.profilePhoto}`}
                      alt="profile photo"
                    />
                  ) : (
                    <div className="rounded-full w-[40px] h-[40px] object-cover bg-slate-200"></div>
                  )}
                </div>
                <p>{user.username}</p>
              </div>
            </NavLink>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
