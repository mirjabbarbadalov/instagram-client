import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <NavLink to={"/"}></NavLink>
      <NavLink to={"/feed"}></NavLink>
      <NavLink to={"/favourites"}></NavLink>
      <NavLink to={"/messages"}></NavLink>
      <NavLink to={"/notifications"}></NavLink>
      <NavLink to={"/profile"}></NavLink>
    </div>
  );
}

export default Sidebar;
