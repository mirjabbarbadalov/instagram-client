import { Skeleton } from "@mui/material";
import { Action } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { fetchAllUsers } from "../../store/slices/allUserSlice";
import { fetchProfileDetails } from "../../store/slices/profileSlice";
import { RootState } from "../../store/store";
import { State } from "../../types/types";

interface User {
  id: string;
  username: string;
  profilePhoto: string | null;
}

export default function Suggestions() {
  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const { user, status, error } = useSelector(
    (state: RootState) => state.profile
  );

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllUsers());
    }
  }, [user?.id, dispatch]);

  const allUsers: User[] = useSelector((state: RootState) => state.user.users);

  const suggestedUsers = allUsers.filter(
    (suggestedUser) => suggestedUser.username !== user?.username
  );

  if (status === "loading") {
    return (
      <div className="flex flex-col">
        <p className="ml-[6px] mb-3 text-sm">Suggested for you:</p>
        <div className="flex mt-2">
          <div className="flex flex-col gap-2">
            <Skeleton
              width={"40px"}
              height={"40px"}
              variant="circular"
              animation="wave"
            />
            <Skeleton
              width={"40px"}
              height={"40px"}
              variant="circular"
              animation="wave"
            />
            <Skeleton
              width={"40px"}
              height={"40px"}
              variant="circular"
              animation="wave"
            />
          </div>

          <div className="flex flex-col gap-2 ml-2">
            <Skeleton width={"100px"} height={"40px"} animation="wave" />
            <Skeleton width={"100px"} height={"40px"} animation="wave" />
            <Skeleton width={"100px"} height={"40px"} animation="wave" />
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="z-0">
      <p className="ml-[6px] mb-3 text-sm">Suggested for you:</p>

      <div className="w-[300px] max-h-[200px] overflow-auto p-3 border-l flex flex-col gap-1">
        {suggestedUsers.map((suggestedUser, index) => (
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
        ))}
      </div>
    </div>
  );
}
