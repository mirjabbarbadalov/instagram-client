import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddPost: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const token = Cookies.get("token");

  const modalRef = useRef<HTMLDivElement>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const resizedBase64Image = await resizeImage(file);
        setBase64Image(resizedBase64Image);
        setImageFile(file);
      } catch (error) {
        console.error(`Error resizing image: ${error}`);
        setErrorMessage("An error occurred while resizing the image.");
      }
    }
  };

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const maxWidth = 700;
      const maxHeight = 700;

      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          const dataURL = event.target.result as string;

          const img = new Image();
          img.src = dataURL;

          img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxWidth || height > maxHeight) {
              const aspectRatio = width / height;

              if (aspectRatio > 1) {
                width = maxWidth;
                height = width / aspectRatio;
              } else {
                height = maxHeight;
                width = height * aspectRatio;
              }
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.8);
              resolve(resizedDataUrl);
            } else {
              reject(new Error("Canvas context is null."));
            }
          };
        } else {
          reject(new Error("Error reading file."));
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleCreatePost = async () => {
    try {
      if (!title || !base64Image) {
        setErrorMessage("Title and image are required.");
        return;
      }

      const requestData = {
        title: title,
        base64Image: base64Image,
      };

      const response = await axios.post(
        "https://instagram-api-88fv.onrender.com/posts/upload",
        JSON.stringify(requestData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error(`Error creating post: ${error}`);
      setErrorMessage("Error occurred.");
      setSuccessMessage("");
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-60 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-md w-[400px] max-h-[550px] flex flex-col items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-black">
          Create a new Post
        </h2>
        <div className="mb-4 w-full flex items-center">
          <label htmlFor="title" className="text-lg text-black">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-black p-2 rounded-md ml-2 outline-none w-full"
          />
        </div>
        <div className="mb-4 w-full flex items-center">
          <label htmlFor="image" className="text-lg text-black">
            Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className=" p-2 rounded-md ml-2 outline-none w-full"
          />
        </div>
        {imageFile && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="max-w-[200px] max-h-[200px] rounded-md"
            />
            <p className="text-sm mt-1 text-black">
              Size: {formatFileSize(imageFile.size)}
            </p>
          </div>
        )}

        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <button
          type="submit"
          onClick={handleCreatePost}
          className="bg-blue-500 text-white font-semibold px-4 py-2 mt-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default AddPost;

function formatFileSize(size: number): string {
  const kbSize = size / 1024;
  if (kbSize < 1024) {
    return `${kbSize.toFixed(2)} KB`;
  } else {
    const mbSize = kbSize / 1024;
    return `${mbSize.toFixed(2)} MB`;
  }
}
