import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillGoogleSquare } from "react-icons/ai";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import logo from "/logo.svg";

function updateCookie(name: string, value: string, expirationDays: number) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expirationDays);
  document.cookie = `${name}=${value}; expires=${expiryDate.toUTCString()}; path=/`;
}

export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loginError, setLoginError] = useState("");
  const formRef = useRef(null);

  const handleSnackbarClose = (
    _event: React.SyntheticEvent<unknown, Event> | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSuccessfulLogin = (token: string) => {
    updateCookie("token", token, 7);

    setTimeout(() => {
      navigate("/feed");
    }, 1000);
  };

  async function loginUser(userName: string, password: string) {
    const data = {
      username: userName,
      password: password,
    };

    try {
      const response = await fetch(
        "https://instagram-api-88fv.onrender.com/auth/login",
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
        setSnackbarOpen(true);
        console.log("Success! Login completed.");
        const responseData = await response.json();
        const token = responseData.token;

        handleSuccessfulLogin(token);
      } else {
        console.error("Login failed with status:", response.status);
        if (response.status === 401) {
          setLoginError("Invalid username or password. Please try again.");
        } else {
          setLoginError("An error occurred. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError("An error occurred. Please try again later.");
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !password) {
      setUserNameError(userName ? "" : "Username is required");
      setPasswordError(password ? "" : "Password is required");
      return;
    }
    setLoginError("");
    loginUser(userName, password);
  };

  return (
    <div className="w-[100vw] h-[100vh]  flex items-center justify-center">
      <div className="w-[450px]">
        <img src="./images/authHero.png" alt="" className="select-none" />
      </div>

      <div className="w-[350px] border-[1px] border-[#dbdbdb] rounded-sm">
        <div className="w-[235px]  mx-auto pt-10 mt-2">
          <img src={logo as unknown as string} alt="instagram logo" />
        </div>

        <div className="mt-3  flex items-center justify-center">
          <button className="flex self-center items-center justify-center gap-2  py-[6px] bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer  w-[62.5%]   rounded-lg text-white font-bold">
            <p className="text-xl">
              <AiFillGoogleSquare />
            </p>{" "}
            Log in with Google
          </button>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          action=""
          className=" flex flex-col justify-between p-10 gap-5"
        >
          <input
            type="text"
            name=""
            id="passwordInput"
            placeholder="Username"
            autoComplete="username"
            className="px-4 py-2 bg-[#fafafa]"
            onChange={(e) => handleUserNameChange(e.target.value)}
          />
          {userNameError && <p className="text-red-500">{userNameError}</p>}

          <input
            type="password"
            name=""
            id="usernameInput"
            placeholder="Password"
            autoComplete="current-password"
            className="px-4 py-2 bg-[#fafafa]"
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}

          {loginError && (
            <p className="text-red-500 text-center mb-4">{loginError}</p>
          )}

          <div className="flex flex-col gap-4 text-center  text-sm">
            <button type="submit">
              <p className="text-[#00376b]">Forgot password?</p>
            </button>
          </div>

          <input
            type="submit"
            value="Login"
            className="bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer w-[80%] py-[6px] rounded-lg text-white font-bold self-center"
          />
        </form>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert elevation={6} variant="filled" severity="success">
          Login successful!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
