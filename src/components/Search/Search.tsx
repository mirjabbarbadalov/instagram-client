import { useEffect, useState } from "react";
import SearchModal from "./SearchModal";
import Cookies from "js-cookie";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    setIsSearchOpen(false);
  };
  return (
    <div>
      <input
        type="text"
        id="search"
        name="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        onClick={() => setIsSearchOpen(true)}
        className="cursor-pointer outline-none mt-3 mb-7 py-2 w-[400px] text-center border border-gray-300 rounded-2xl focus:placeholder-gray-200 focus:border-black"
      />

      {isSearchOpen && (
        <SearchModal usernames={allUserNames} onSearch={handleSearch} />
      )}
    </div>
  );
}
