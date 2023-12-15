import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import SearchModal from "./SearchModal";

export default function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [allUserNames, setAllUsernames] = useState<string[]>([]);

  async function getOtherUsers() {
    try {
      const data = await fetch(
        "https://instagram-api-88fv.onrender.com/users/all",
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
      const users = response.users.map((e: { username: string }) => e.username);
      setAllUsernames(users);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  useEffect(() => {
    getOtherUsers();
  }, []);

  const handleSearch = (query: string) => {
    console.log("Search Query:", query);
    setIsSearchOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsSearchOpen(true)}
        className="cursor-pointer focus:outline-1 mt-3 mb-7 py-2 w-[400px] text-center border border-gray-300 rounded-md focus:placeholder-gray-200 focus:border-black"
      >
        Open Search
      </button>

      {isSearchOpen && (
        <SearchModal usernames={allUserNames} onSearch={handleSearch} />
      )}
    </div>
  );
}
