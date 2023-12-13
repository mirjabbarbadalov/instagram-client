import { useState } from "react";
import AddPost from "./AddPost"; // Import the AddPost component

export const AddPostButton = () => {
  const [showAddPost, setShowAddPost] = useState(false);

  const handleButtonClick = () => {
    setShowAddPost(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleButtonClick}
        className="text-white  inline-flex items-center bg-blue-500 hover:bg-blue-600  focus:outline-none  font-medium rounded-lg text-sm px-6 py-2.5 text-center mt-0 mb-4 "
      >
        <svg
          className="me-1 ms-2 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add new post
      </button>

      {showAddPost && <AddPost onClose={() => setShowAddPost(false)} />}
    </div>
  );
};
