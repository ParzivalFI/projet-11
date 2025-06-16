import Log from "../Log/Log";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import "./Navbar.css";

function NavBar() {
  return (
    <nav className="main-nav">
      <Link to="/index" className="main-nav-logo">
        <Logo />
      </Link>
      <div className="main-nav-item">
        <Log />
      </div>
    </nav>
  );
}

export default NavBar;
