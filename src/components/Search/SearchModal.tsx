import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface SearchModalProps {
  usernames: string[];
  onSearch: (query: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ usernames, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const filteredUsernames = usernames
    .filter((username) =>
      username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-black z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </div>
        <button
          type="button"
          onClick={() => onSearch("")}
          className="mt-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          Cancel
        </button>
        <div className="mt-4">
          {searchQuery && filteredUsernames.length > 0 ? (
            <>
              <h3>Matching Usernames:</h3>
              <ul className="list-none p-0">
                {filteredUsernames.map((username) => (
                  <li key={username} className="mb-2">
                    <NavLink
                      to={`/profile/${username}`}
                      className="block p-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
                    >
                      {username}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No matching usernames</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
