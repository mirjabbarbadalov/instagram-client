import Cookies from "js-cookie";
import { SetStateAction, useEffect, useState } from "react";
import AddPhoto from "./AddPhoto";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formInteracted, setFormInteracted] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const getUserDetails = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        "https://instagram-api-88fv.onrender.com/users/signedin",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUsername(data.username);
        setFullname(data.fullName);
        setEmail(data.email);
        setProfilePhoto(data.profilePhoto);
      }
    } catch (error) {
      console.error("An error occurred while fetching user details:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const updateField = async (
    field: string,
    newValue: SetStateAction<string>
  ) => {
    setFormSubmitting(true);

    try {
      const token = Cookies.get("token");
      const requestBody = {
        username: username,
        [`new${field.charAt(0).toUpperCase() + field.slice(1)}`]: newValue,
      };

      if (field === "profilePhoto") {
        requestBody.profilePhoto = newValue;
      }

      const response = await fetch(
        `https://instagram-api-88fv.onrender.com/users/modify/${field}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.ok) {
        switch (field) {
          case "username":
            setUsername(newValue);
            console.log("Username updated successfully");
            break;
          case "fullname":
            setFullname(newValue);
            console.log("Full name updated successfully");
            break;
          case "email":
            setEmail(newValue);
            console.log("Email updated successfully");
            break;
          case "profilePhoto":
            setProfilePhoto(newValue);
            console.log("Profile photo updated successfully");
            break;
          default:
            break;
        }
      } else {
        console.error(`Failed to update ${field}:`, data.message);
      }
    } finally {
      setFormSubmitting(false);
      setLoading(false);
    }
  };

  const updatePasswordHandler = async () => {
    setFormSubmitting(true);

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        "https://instagram-api-88fv.onrender.com/users/modify/password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Password updated successfully");
      } else {
        console.error("Failed to update password:", data.message);
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  const deleteUserHandler = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = Cookies.get("token");
      console.log(token);
      const response = await fetch(
        "https://instagram-api-88fv.onrender.com/users/delete",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setDeleteMessage("User has been deleted");
        window.location.href = "/login";
      } else {
        const data = await response.json();
        console.error("Failed to delete user:", data.message);
        setDeleteMessage(`Failed to delete user: ${data.message}`);
      }
    } catch (error) {
      console.error("An error occurred while deleting the user:", error);
      setDeleteMessage("An error occurred while deleting the user.");
    }
  };

  const formDetails = [
    {
      label: "Username",
      field: "username",
      placeholder: "Your username",
      value: username,
      loading: loading,
      updateFunction: updateField,
    },
    {
      label: "Full Name",
      field: "fullname",
      placeholder: "Your Full Name",
      value: fullname,
      loading: loading,
      updateFunction: updateField,
    },
    {
      label: "Email",
      field: "email",
      placeholder: "Your email address",
      value: email,
      loading: loading,
      updateFunction: updateField,
    },
  ];

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
              {profilePhoto !== null && profilePhoto !== undefined ? (
                <img
                  src={`data:image/jpeg;base64,${profilePhoto}`}
                  alt="Profile Photo"
                  className="rounded-full w-[80px] h-[80px] object-cover"
                />
              ) : (
                <div className="w-[60px] h-[60px] rounded-[50%] bg-sky-200"></div>
              )}
            </div>

            <div className="user-details-text flex flex-col ml-4">
              <p className="font-bold">{username}</p>
              <p>{fullname}</p>
            </div>
          </div>
          <AddPhoto username={username} />
        </div>
      </section>
      <div className="forms-container mt-10">
        {formDetails.map((form, index) => (
          <form
            key={index}
            onFocus={() => setFormInteracted(true)}
            onSubmit={(e) => {
              e.preventDefault();
              const formElement = e.target as HTMLFormElement;
              const newValueInput = formElement.elements.namedItem(
                form.field
              ) as HTMLInputElement | null;
              const newValue = newValueInput ? newValueInput.value : "";
              form.updateFunction(form.field, newValue);
            }}
            className="flex flex-col"
          >
            <label htmlFor={form.field} className="font-bold mb-3">
              {form.label}
            </label>
            <p className="text-gray-500 text-xs mb-3">
              {`Enter your ${form.label.toLowerCase()}`}
            </p>
            {form.field === "email" && (
              <p className="text-gray-500 text-xs mb-3">{`Old email: ${form.value}`}</p>
            )}
            <input
              type={form.field === "email" ? "email" : "text"}
              id={form.field}
              name={form.field}
              placeholder={form.placeholder}
              className="outline-none mb-4 p-4 border border-gray-300 rounded-2xl focus:placeholder-gray-200 focus:border-black"
            />

            <button
              type="submit"
              disabled={!formInteracted || formSubmitting || form.loading}
              className={`${
                !formInteracted || formSubmitting || form.loading
                  ? "bg-[#fafafa] text-[#008dec] cursor-not-allowed"
                  : "bg-[#008dec] text-white"
              } rounded-lg py-3 w-[35%] self-end`}
            >
              {form.loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        ))}

        <form
          onFocus={() => setFormInteracted(true)}
          onSubmit={(e) => {
            e.preventDefault();
            updatePasswordHandler();
          }}
          className="flex flex-col"
        >
          <label htmlFor="newPassword" className="font-bold mb-3">
            New Password
          </label>
          <p className="text-gray-500 text-xs mb-3">Enter your new password</p>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="outline-none mb-4 p-4 border border-gray-300 rounded-2xl focus:placeholder-gray-200 focus:border-black"
          />

          <button
            type="submit"
            disabled={!formInteracted || formSubmitting}
            className={`${
              !formInteracted || formSubmitting
                ? "bg-[#fafafa] text-[#008dec] cursor-not-allowed"
                : "bg-[#008dec] text-white"
            } rounded-lg py-3 w-[35%] self-end`}
          >
            {formSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="mt-10">
        <button
          type="button"
          onClick={deleteUserHandler}
          className="bg-red-500 text-white rounded-lg py-3 w-full"
        >
          Delete Account
        </button>
        {deleteMessage && (
          <p className="text-red-500 text-xs py-3 mt-2 ml-4 w-full text-center">
            Message: {deleteMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
