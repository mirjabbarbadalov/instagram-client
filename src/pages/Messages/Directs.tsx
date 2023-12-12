import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { State } from "../../types/types";
import { Action } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { fetchAllUsers } from "../../store/slices/allUserSlice";
import { RootState } from "../../store/store";

interface User {
  profilePhoto: string;
  id: string;
  username: string;
  following?: string[];
}

export const Directs = () => {
  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const { user } = useSelector((state: RootState) => state.profile);

  const follow: User[] = user.following;
  const chatters: (string | undefined)[] = follow.map((user) => user?.username);
  const profilePhoto = follow.map((user) => user.profilePhoto);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllUsers());
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="px-8">
      {chatters.map((chatter, index) => (
        <NavLink
          key={index}
          to={`/chats/${chatter}`}
          className="block py-2 text-blue-500 hover:underline"
        >
          <div>
            <img
              src={`data:image/jpeg;base64,${profilePhoto[index]}`}
              alt="Profile Photo"
              className="rounded-full w-[30px] h-[30px] object-cover"
            />
            {chatter}
          </div>
        </NavLink>
      ))}
    </div>
  );
};
