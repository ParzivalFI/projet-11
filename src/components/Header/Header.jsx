import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Rebux/userSlice";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header>
      <nav class="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            class="main-nav-logo-image"
            src="./assets/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 class="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {user ? (
            <>
              <Link class="main-nav-item" to="/user">
                <i class="fa fa-user-circle"></i>
                {user.userName}
              </Link>
              <Link class="main-nav-item" to="/" onClick={handleLogout}>
                <i class="fa fa-sign-out"></i>
                Sign Out
              </Link>
            </>
          ) : (
            <Link to="/sign-in" class="main-nav-item">
              <i class="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
