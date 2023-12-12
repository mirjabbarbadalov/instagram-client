import { Action } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { fetchProfileDetails } from "../../store/slices/profileSlice";
import { RootState } from "../../store/store";
import { State, User } from "../../types/types";

export default function Suggestions() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const { user } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.id) {
      console.log(user.id);
      setUserId(user.id);
      getAllUsers();
    }
  }, [user, user.id]);

  async function getAllUsers() {
    try {
      if (userId) {
        const response = await fetch(
          "https://instagram-api-88fv.onrender.com/users/all",
          {
            method: "GET",
            mode: "cors",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not in JSON format.");
        }

        const data = await response.json();

        const filteredUsers = data.users.filter((friend: User) => {
          return friend._id !== userId;
        });
        setAllUsers(filteredUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

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
