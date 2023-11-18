import { useState } from "react";
import logo from "/logo.svg";
import { AiFillGoogleSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (_event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  async function loginUser(userName: string, password: string) {
    const data = {
      username: userName,
      password: password,
    };
    try {
      const response = await fetch(
        "https://instagram-api-88fv.onrender.com/api/login",
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
        console.log("Success! Login completed.");
        setSnackbarOpen(true);
        const data = await response.json();
        const token = await data.token;

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        document.cookie = `token=${token}; expires=${expiryDate.toUTCString()}; path=/`;

        setSnackbarOpen(true);

        setTimeout(() => {
          navigate("/feed");
        }, 3000);
      } else {
        console.error("Login failed with status:", response.status);
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

  return (
    <div className="w-[100vw] h-[100vh]  flex items-center justify-center">
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

        <div className="mt-3  flex items-center justify-center">
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
            type="text"
            name=""
            id=""
            placeholder="Username"
            className="px-4 py-2 bg-[#fafafa]"
            onChange={(e) => handleUserNameChange(e.target.value)}
          />
          {userNameError && <p className="text-red-500">{userNameError}</p>}

          <input
            type="password"
            name=""
            id=""
            placeholder="Password"
            className="px-4 py-2 bg-[#fafafa]"
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
          <div className="flex flex-col gap-4 text-center  text-sm">
            <button>
              <p className="text-[#00376b]">Forgot password?</p>
            </button>
          </div>

          <input
            type="submit"
            value="Login"
            className="bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer w-[80%] py-[6px] rounded-lg text-white font-bold self-center"
            onClick={(e) => {
              loginUser(userName, password);
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
          Login successfull!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default LoginPage;
