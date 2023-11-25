import { useState } from "react";
import SearchModal from "./SearchModal";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dummyUsernames = [
    "john123",
    "alice456",
    "bob789",
    "sara234",
    "mark567",
    "emily890",
    "chris123",
    "lisa456",
    "david789",
    "kate234",
    "mike567",
    "olivia890",
    "ryan123",
    "ava456",
    "megan789",
    "luke234",
    "sophie567",
    "peter890",
    "amy123",
    "daniel456",
    "emma789",
    "jacob234",
    "grace567",
    "leo890",
    "ella123",
    "nathan456",
    "mia789",
    "logan234",
    "zoe567",
    "owen890",
    "lily123",
    "tyler456",
    "oliver789",
    "lucas234",
    "ella567",
    "liam890",
    "ava123",
    "noah456",
  ];

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
        <SearchModal usernames={dummyUsernames} onSearch={handleSearch} />
      )}
    </div>
  );
}
