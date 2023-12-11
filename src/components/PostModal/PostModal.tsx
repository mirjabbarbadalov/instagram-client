import { useState } from "react";

function PostModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [titleError, setTitleError] = useState("");
  const [imgUrlError, setImgUrlError] = useState("");

  function getCookieValue(cookieName: string) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith(cookieName + "=")) {
        return cookie.substring(cookieName.length + 1);
      }
    }
    return null;
  }

  const token = getCookieValue("token");

  if (token) {
    console.log("Token  found");
  } else {
    console.log("Token not found or cookie does not exist.");
  }

  async function createPost() {
    const data = {
      title: title,
      url: imgUrl,
    };

    if (token) {
      const endpoint = "https://instagram-api-88fv.onrender.com/api/posts";

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Post created:", responseData);
          return responseData;
        } else {
          console.error(
            "Failed to create post:",
            response.status,
            response.statusText
          );
          throw new Error("Failed to create post");
        }
      } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Error creating post");
      }
    } else {
      console.error("Token is missing");
      throw new Error("Token is missing");
    }
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setTitleError("");
    setImgUrlError("");

    if (!title) {
      setTitleError("Title is required");
    }
    if (!imgUrl) {
      setImgUrlError("Image URL is required");
    }

    if (title && imgUrl) {
      console.log("Form submitted:", { title, imgUrl });

      setIsModalOpen(false);

      setTitle("");
      setImgUrl("");
      createPost();
    }
  };

  return (
    <div className="ml-16 mt-3 mb-7">
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add Post
      </button>

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-black z-50"
          id="crud-modal"
          aria-hidden="false"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Post
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter title"
                      required
                    />
                    {titleError && (
                      <p className="text-red-500 text-sm mt-1">{titleError}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="imgUrl"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="imgUrl"
                      value={imgUrl}
                      onChange={(e) => setImgUrl(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter image URL"
                      required
                    />
                    {imgUrlError && (
                      <p className="text-red-500 text-sm mt-1">{imgUrlError}</p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
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
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostModal;
