import { Action } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { fetchProfileDetails } from "../../store/slices/profileSlice";
import { fetchAllUsers } from "../../store/slices/allUserSlice";
import { RootState } from "../../store/store";
import { State } from "../../types/types";

export default function Suggestions() {
  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const { user } = useSelector((state: RootState) => state.profile);
  const userId = user?.id;

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAllUsers());
    }
  }, [userId, dispatch]);

  interface User {
    id: string;
    username: string;
    profilePhoto: string | null;
  }

  const allUsers: User[] = useSelector((state: RootState) => state.user.users);

  return (
    <div className="z-0">
      <p className="ml-[6px] mb-3 text-sm">Suggested for you:</p>
      <div className="w-[300px] max-h-[200px] overflow-auto p-3 border-l flex flex-col gap-1">
        {allUsers && allUsers.length > 0 ? (
          allUsers.map((user, index) => (
            <NavLink key={index} to={`/friend/${user.username}`}>
              <div className="flex items-center gap-2 cursor-pointer w-[100%]">
                <div className="">
                  {user.profilePhoto ? (
                    <img
                      className="rounded-full w-[40px] h-[40px] object-cover"
                      src={`data:image/jpeg;base64,${user.profilePhoto}`}
                      alt="profile photo"
                    />
                  ) : (
                    <div className="rounded-full w-[40px] h-[40px] object-cover bg-slate-200"></div>
                  )}
                </div>
                <p>{user.username}</p>
              </div>
            </NavLink>
          ))
        ) : (
          <p>No suggested users found.</p>
        )}
      </div>
    </div>
  );
}
