import logo from "/logo.svg";
import { AiFillGoogleSquare } from "react-icons/ai";

function LoginPage() {
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

        <div className="mt-3 mt-3 flex items-center justify-center">
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
            name=""
            id=""
            placeholder="Email or Username"
            className="px-4 py-2 bg-[#fafafa]"
          />

          <input
            type="password"
            name=""
            id=""
            placeholder="Password"
            className="px-4 py-2 bg-[#fafafa]"
          />
          <div className="flex flex-col gap-4 text-center  text-sm">
            <button>
              <p className="text-[#00376b]">Forgot password?</p>
            </button>
          </div>

          <input
            type="submit"
            value="Sign up"
            className="bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer w-[80%] py-[6px] rounded-lg text-white font-bold self-center"
          />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
