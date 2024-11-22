import { NavLink } from "react-router-dom";

const ClientNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-sm">
        <NavLink to="/">
          <span className="navbar-brand">Turtle Pizza</span>
        </NavLink>
        <ul className="navbar-nav">
        </ul>
      </div>
    </nav>
  );
};

export default ClientNavbar;
