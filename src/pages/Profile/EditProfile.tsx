import Cookies from "js-cookie";
import { SetStateAction, useEffect, useState } from "react";

export default function EditProfileNew() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const [usernameLoading, setUsernameLoading] = useState(false);
  const [fullnameLoading, setFullnameLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formInteracted, setFormInteracted] = useState(false);

  const getUserDetails = async () => {
    fetch("https://instagram-api-88fv.onrender.com/users/signedin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
        setFullname(data.fullName);
        setEmail(data.email);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const updateUsername = async (newUsername: SetStateAction<string>) => {
    setFormSubmitting(true);
    setUsernameLoading(true);

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        "https://instagram-api-88fv.onrender.com/users/modify/username",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newUsername, username }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsername(newUsername);
        console.log("Username updated successfully");
      } else {
        console.error("Failed to update username:", data.message);
      }
    } finally {
      setFormSubmitting(false);
      setUsernameLoading(false);
    }
  };

  const updateFullName = async (newFullname: SetStateAction<string>) => {
    setFormSubmitting(true);
    setFullnameLoading(true);

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        "https://instagram-api-88fv.onrender.com/users/modify/fullname",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newFullName: newFullname, username }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFullname(newFullname);
        console.log("Full name updated successfully");
      } else {
        console.error("Failed to update full name:", data.message);
      }
    } finally {
      setFormSubmitting(false);
      setFullnameLoading(false);
    }
  };

  const updateEmail = async (newEmail: SetStateAction<string>) => {
    setFormSubmitting(true);
    setEmailLoading(true);

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        "https://instagram-api-88fv.onrender.com/users/modify/email",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newEmail, username }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEmail(newEmail);
        console.log("Email updated successfully");
      } else {
        console.error("Failed to update email:", data.message);
      }
    } finally {
      setFormSubmitting(false);
      setEmailLoading(false);
    }
  };

  return (
    <div className="p-4 flex justify-center flex-col ml-10">
      <section>
        <div className="mb-10 mt-5">
          <h2 className="font-bold text-xl">Edit profile</h2>
        </div>
      </section>
      <section>
        <div className="informations flex gap-96 items-center justify-between bg-[#efefef] p-4 rounded-[20px]">
          <div className="informations-left-side flex items-center">
            <div className="profile-photo-container">
              <img src="" alt="" />
              <div className="w-[60px] h-[60px] rounded-[50%] bg-sky-200"></div>
            </div>
            <div className="user-details-text flex flex-col ml-4">
              <p className="font-bold">{username}</p>
              <p>{fullname}</p>
            </div>
          </div>
          <button
            type="button"
            className="bg-black text-white rounded-[10px] px-5 py-2 text-sm font-[600]"
          >
            Change photo
          </button>
        </div>
      </section>
      <div className="forms-container mt-10">
        <form
          onFocus={() => setFormInteracted(true)}
          onSubmit={(e) => {
            e.preventDefault();
            const newUsernameInput = (
              e.target as HTMLFormElement
            ).elements.namedItem("username") as HTMLInputElement | null;
            const newUsername = newUsernameInput ? newUsernameInput.value : "";
            updateUsername(newUsername);
          }}
          className="flex flex-col"
        >
          <label htmlFor="username" className="font-bold mb-3">
            Username
          </label>
          <p className="text-gray-500 text-xs mb-3">
            Enter your desired username
          </p>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Your username"
            className="outline-none mb-4 p-4 border border-gray-300 rounded-2xl focus:placeholder-gray-200 focus:border-black"
          />

          <button
            type="submit"
            disabled={!formInteracted || formSubmitting || usernameLoading}
            className={`${
              !formInteracted || formSubmitting || usernameLoading
                ? "bg-[#fafafa] text-[#008dec] cursor-not-allowed"
                : "bg-[#008dec] text-white"
            } rounded-lg py-3 w-[35%] self-end`}
          >
            {usernameLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <form
          onFocus={() => setFormInteracted(true)}
          onSubmit={(e) => {
            e.preventDefault();
            const newFullNameInput = (
              e.target as HTMLFormElement
            ).elements.namedItem("fullName") as HTMLInputElement | null;
            const newFullName = newFullNameInput ? newFullNameInput.value : "";
            updateFullName(newFullName);
          }}
          className="flex flex-col"
        >
          <label htmlFor="fullName" className="font-bold mb-3">
            Full Name
          </label>
          <p className="text-gray-500 text-xs mb-3">Change your full name</p>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Your Full Name"
            className="outline-none mb-4 p-4 border border-gray-300 rounded-2xl focus:placeholder-gray-200 focus:border-black"
          />

          <button
            type="submit"
            disabled={!formInteracted || formSubmitting || fullnameLoading}
            className={`${
              !formInteracted || formSubmitting || fullnameLoading
                ? "bg-[#fafafa] text-[#008dec] cursor-not-allowed"
                : "bg-[#008dec] text-white"
            } rounded-lg py-3 w-[35%] self-end`}
          >
            {fullnameLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <form
          onFocus={() => setFormInteracted(true)}
          onSubmit={(e) => {
            e.preventDefault();
            const newEmailInput = (
              e.target as HTMLFormElement
            ).elements.namedItem("email") as HTMLInputElement | null;
            const newEmail = newEmailInput ? newEmailInput.value : "";
            updateEmail(newEmail);
          }}
          className="flex flex-col"
        >
          <label htmlFor="email" className="font-bold mb-3">
            Email
          </label>
          <p className="text-gray-500 text-xs mb-3">
            Update your email address
          </p>
          <p className="text-gray-500 text-xs mb-3">Old email: {email}</p>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email address"
            className="outline-none mb-8 p-4 border border-gray-300 rounded-2xl focus:placeholder-gray-200 focus:border-black"
          />

          <button
            type="submit"
            disabled={!formInteracted || formSubmitting || emailLoading}
            className={`${
              !formInteracted || formSubmitting || emailLoading
                ? "bg-[#fafafa] text-[#008dec] cursor-not-allowed"
                : "bg-[#008dec] text-white"
            } rounded-lg py-3 w-[35%] self-end`}
          >
            {emailLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
