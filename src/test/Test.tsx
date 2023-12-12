import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { fetchAllUsers } from "../store/slices/allUserSlice";
import { State } from "../types/types";

const UserList = () => {
  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const users = useSelector((state: State) => state.user.users);
  const loading = useSelector((state: State) => state.user.loading);
  const error = useSelector((state: State) => state.user.error);

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

  if (loading === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-[500px] bg-zinc-300 flex items-center justify-center">
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
