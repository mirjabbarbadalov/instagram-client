import { Action } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { fetchProfileDetails } from "../../store/slices/profileSlice";
import { fetchAllUsers } from "../../store/slices/allUserSlice";
import { RootState } from "../../store/store";
import { State } from "../../types/types";

interface User {
  id: string;
  username: string;
  profilePhoto: string | null;
}

export default function Suggestions() {
  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const { user } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllUsers());
    }
  }, [user?.id, dispatch]);

  const allUsers: User[] = useSelector((state: RootState) => state.user.users);
  console.log("User:", user);
  console.log("All Users:", allUsers);
  const suggestedUsers = allUsers.filter(
    (suggestedUser) => suggestedUser.username !== user?.username
  );

  console.log("Suggested Users:", suggestedUsers);

  return (
    <div className="z-0">
      <p className="ml-[6px] mb-3 text-sm">Suggested for you:</p>
      <div className="w-[300px] max-h-[200px] overflow-auto p-3 border-l flex flex-col gap-1">
        {suggestedUsers && suggestedUsers.length > 0 ? (
          suggestedUsers.map((suggestedUser, index) => (
            <NavLink key={index} to={`/friend/${suggestedUser.username}`}>
              <div className="flex items-center gap-2 cursor-pointer w-[100%]">
                <div className="">
                  {suggestedUser.profilePhoto ? (
                    <img
                      className="rounded-full w-[40px] h-[40px] object-cover"
                      src={`data:image/jpeg;base64,${suggestedUser.profilePhoto}`}
                      alt="profile photo"
                    />
                  ) : (
                    <div className="rounded-full w-[40px] h-[40px] object-cover bg-slate-200"></div>
                  )}
                </div>
                <p>{suggestedUser.username}</p>
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
