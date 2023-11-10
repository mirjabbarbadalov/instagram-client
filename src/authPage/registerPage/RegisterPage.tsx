import logo from "/logo.svg";
import { AiFillGoogleSquare } from "react-icons/ai";

function RegisterPage() {
  return (
    <div className="w-[100vw] h-[100vh]  flex items-center justify-center">
      <div className="w-[450px]">
        <img
          src="../../src/images/authHero.png"
          alt=""
          className="select-none"
        />
      </div>

      <div className="w-[400px] border-[1px] border-[#dbdbdb] rounded-sm">
        <div className="w-[235px]  mx-auto pt-10 mt-2">
          <img src={logo} alt="instagram logo" />
        </div>
        <div className="w-[70%] mx-auto mt-3">
          <p className="text-center text-[#737373] font-semibold ">
            Sign up to see photos and videos from your friends
          </p>
        </div>
        <div className="mt-3">
          <button className="flex items-center justify-center gap-2 py-[6px] bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer  w-[320px]  ml-[40px]  rounded-lg text-white font-bold">
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
            placeholder="Email"
            className="px-4 py-2 bg-[#fafafa]"
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="Full Name"
            className="px-4 py-2 bg-[#fafafa]"
          />

          <input
            type="text"
            name=""
            id=""
            placeholder="Username"
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
            className="bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer w-[320px] py-[6px] rounded-lg text-white font-bold self-center"
          />
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
