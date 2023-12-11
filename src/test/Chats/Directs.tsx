import { NavLink } from "react-router-dom";

export const Directs = () => {
  const usernames = ["user1", "user2", "user3", "user4", "user5"];

  return (
    <div className="px-8">
      {usernames.map((username, index) => (
        <NavLink
          key={index}
          to={`/${username}`}
          className="block py-2 text-blue-500 hover:underline"
        >
          {username}
        </NavLink>
      ))}
    </div>
  );
};
