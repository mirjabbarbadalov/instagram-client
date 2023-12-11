import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

interface Person {
  id: number;
  name: string;
  profileImage: string;
}

const dummyPeople: Person[] = [
  { id: 1, name: "John Doe", profileImage: "https://placekitten.com/50/50" },
  { id: 2, name: "Jane Doe", profileImage: "https://placekitten.com/51/50" },
  { id: 3, name: "Alice", profileImage: "https://placekitten.com/52/50" },
];

const Messages: React.FC = () => {
  return (
    <div className="flex gap-10">
      <div className="flex flex-col w-80 border-r p-4">
        <h2 className="mb-4 text-lg font-bold">Chats</h2>
        <NavLink
          to="/messages/new"
          className="block mb-4 text-blue-500 hover:text-blue-700"
        >
          New Message
        </NavLink>
        <ul>
          {dummyPeople.map((person) => (
            <li key={person.id} className="mb-2 flex items-center">
              <img
                src={person.profileImage}
                alt={`${person.name}'s profile`}
                className="w-16 h-16 rounded-full mr-2"
              />
              <NavLink
                to={`/messages/${person.id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                {person.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Routes>
        <Route path="/messages/new" />
      </Routes>
    </div>
  );
};

export default Messages;
