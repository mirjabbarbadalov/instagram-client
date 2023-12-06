import React, { useRef, useState } from "react";
import Cookies from "js-cookie";

interface AddPhotoProps {
  username: string;
}

export const AddPhoto: React.FC<AddPhotoProps> = ({ username }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [base64String, setBase64String] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<string | null>(null);
  const [imageSelected, setImageSelected] = useState(false);
  const token = Cookies.get("token");

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      convertToBase64(file);
    } else {
      alert("Please select a valid JPG or PNG file.");
    }
  };

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result) {
        const result = event.target.result as string;
        resizeImage(result, (resizedImage: string) => {
          setBase64String(resizedImage.split(",")[1]);
          logConvertedSize(resizedImage.split(",")[1]);
          setImageSelected(true);
        });
      } else {
        console.error("Error reading file.");
      }
    };

    reader.readAsDataURL(file);
  };

  const resizeImage = (
    dataURL: string,
    callback: (resizedDataUrl: string) => void
  ) => {
    const maxWidth = 540;
    const maxHeight = 540;

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
        const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.6);
        callback(resizedDataUrl);
      }
    };
  };

  const logConvertedSize = (base64String: string) => {
    const sizeInKB = (base64String.length * (3 / 4)) / 1024;
    setConvertedSize(`${sizeInKB.toFixed(2)} KB`);
    console.log("Converted Size:", `${sizeInKB.toFixed(2)} KB`);
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(
        "https://instagram-api-88fv.onrender.com/users/upload/photo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            base64Image: base64String,
            username: username,
          }),
        }
      );
      console.log(1, response);
      if (response.ok) {
        const data = await response.json();
        console.log(2, data);
        console.log("Image uploaded successfully:", data);
      } else {
        console.error("Image upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during image upload:", error);
    }
  };

  return (
    <div>
      {imageSelected && base64String && (
        <div className="w-[120px] mt-2 mb-2">
          <img
            src={`data:image/jpeg;base64,${base64String}`}
            alt="Resized"
            className="rounded-lg"
          />
          <p className="text-sm mb-0">Size: {convertedSize}</p>
        </div>
      )}
      <input
        aria-label="input"
        type="file"
        accept=".jpg, .png"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      {imageSelected && (
        <button
          type="submit"
          onClick={() => {
            if (base64String) {
              uploadImage();
            }
          }}
          className="bg-slate-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
        >
          Submit
        </button>
      )}
      <button
        type="submit"
        onClick={handleButtonClick}
        className="bg-slate-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
      >
        Select Photo
      </button>
    </div>
  );
};
