import { useState } from "react";
import logo from "/logo.svg";
import { AiFillGoogleSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function RegisterPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSnackbarClose = (_event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  async function registerUser(userName: string, password: string, email: string, fullName: string) {
    const data = {
      username: userName,
      password: password,
      email: email,
      fullname: fullName,
    };
    try {
      const response = await fetch(
        "https://instagram-api-88fv.onrender.com/api/register",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Success! Registration completed.");

        setSnackbarOpen(true);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        console.error("Registration failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleUserNameChange(value: string) {
    setUserName(value);
    if (value.length === 0) {
      setUserNameError("Username is required");
    } else {
      setUserNameError("");
    }
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    if (value.length === 0) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  }

  function handleFullNameChange(value: string) {
    setFullName(value);
    if (value.length === 0) {
      setFullNameError("Full Name is required");
    } else {
      setFullNameError("");
    }
  }

  function handleEmailChange(value: string) {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length === 0) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  }

  return (
    <div className="w-[100vw] h-[100vh]  flex items-center justify-center mt-5">
      <div className="w-[450px]">
        <img
          src="../../src/images/authHero.png"
          alt=""
          className="select-none"
        />
      </div>

      <div className="w-[350px] border-[1px] border-[#dbdbdb] rounded-sm">
        <div className="w-[235px]  mx-auto pt-10 mt-2">
          <img src={logo} alt="instagram logo" />
        </div>
        <div className="w-[70%] mx-auto mt-3">
          <p className="text-center text-[#737373] font-semibold ">
            Sign up to see photos and videos from your friends
          </p>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <button className="flex self-center items-center justify-center gap-2  py-[6px] bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer  w-[62.5%]   rounded-lg text-white font-bold">
            <p
              className="text-xl
            "
            >
              <AiFillGoogleSquare />
            </p>{" "}
            Log in with Google
          </button>
        </div>

        <form action="" className=" flex flex-col justify-between p-10 gap-5">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 bg-[#fafafa]"
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}

          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-2 bg-[#fafafa]"
            onChange={(e) => handleFullNameChange(e.target.value)}
          />
          {fullNameError && <p className="text-red-500">{fullNameError}</p>}

          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 bg-[#fafafa]"
            onChange={(e) => handleUserNameChange(e.target.value)}
          />
          {userNameError && <p className="text-red-500">{userNameError}</p>}

          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 bg-[#fafafa]"
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}

          <div className="flex flex-col gap-4 text-center  text-sm">
            <p className="text-[#737373]">
              People who use our service may have uploaded your contact
              information to Instagram. Learn More
            </p>
            <p className="text-[#737373] px-2  ">
              {" "}
              By signing up, you agree to our Terms , Privacy Policy and Cookies
              Policy.
            </p>
          </div>
          <input
            type="submit"
            value="Sign up"
            className="bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer w-[80%] py-[6px] rounded-lg text-white font-bold self-center"
            onClick={(e) => {
              registerUser(userName, password, email, fullName);
              e.preventDefault();
            }}
          />
        </form>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          Registration completed successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default RegisterPage;
