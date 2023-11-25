import { FormEvent, useState } from "react";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
  });

  const [formChanged, setFormChanged] = useState(false);

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormChanged(true);
    // Add more properites
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormChanged(false);
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
              {/* Delete Later */}
              <div className="w-[60px] h-[60px] rounded-[50%] bg-sky-200"></div>
              {/* Delete Later */}
            </div>
            <div className="user-details-text flex flex-col ml-4">
              <p className="font-bold">username</p>
              <p>Full Name</p>
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
      <div className="form-container mt-10 ">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="username" className="font-bold">
            Username
          </label>
          <p className="text-gray-500 text-xs mb-3">
            Enter your desired username
          </p>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Your username"
            className="outline-none mb-4 p-4 border border-gray-300 rounded-2xl focus:placeholder-gray-200 focus:border-black"
          />

          <label htmlFor="fullName" className="font-bold">
            Full Name
          </label>
          <p className="text-gray-500 text-xs mb-3">Change your full name</p>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Your Full Name"
            className="outline-none mb-4 p-4 border border-gray-300 rounded-2xl focus:placeholder-gray-200 focus:border-black"
          />

          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <p className="text-gray-500 text-xs mb-3">
            Update your email address
          </p>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your email address"
            className="outline-none mb-8 p-4 border border-gray-300 rounded-2xl focus:placeholder-gray-200 focus:border-black"
          />

          <button
            type="submit"
            className={`bg-[#008dec] text-white rounded-lg py-3 w-[35%] self-end ${
              formChanged ? "" : "cursor-not-allowed opacity-50"
            }`}
            disabled={!formChanged}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
