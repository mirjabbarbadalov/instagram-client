import { NavLink } from "react-router-dom";

export const Directs = () => {
  const chatters = ["user1", "user2", "user3", "user4", "mirishh", "batman"];

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
