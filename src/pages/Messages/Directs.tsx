import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { State } from "../../types/types";
import { Action } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { fetchAllUsers } from "../../store/slices/allUserSlice";
import { RootState } from "../../store/store";

interface User {
  id: string;
  username: string;
}

export const Directs = () => {
  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const { user } = useSelector((state: RootState) => state.profile);

  const follow: User[] = user.following;
  console.log(follow);

  const chatters: (string | undefined)[] = follow.map((user) => user?.username);
  console.log(chatters);

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
          {chatter}
        </NavLink>
      ))}
    </div>
  );
};
