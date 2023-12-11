import { NavLink } from "react-router-dom";
export const NotFound = () => {
  return (
    <div>
      <p>
        Sorry, this page isn't available.The link you followed may be broken, or
        the page may have been removed.
      </p>
      <NavLink to="/">Go back</NavLink>
    </div>
  );
};
