import { useEffect, useState } from "react";
import { User } from "../../types/types";

export default function Suggestions() {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  async function getAllUsers() {
    try {
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
      setAllUsers(data.users);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(allUsers);

  return (
    <div>
      <div className="w-[300px] max-h-[200px] overflow-auto border border-gray-300 rounded-sm p-1 flex flex-col gap-1">
        {allUsers && allUsers.length > 0 ? (
          allUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center gap-2 cursor-pointer w-[100%]"
            >
              <div className="w-[40px] h-[40px] rounded-full bg-red-300 ml-3"></div>
              <p>{user.username}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
