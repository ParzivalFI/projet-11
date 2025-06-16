// import React, { useEffect } from "react";
import NavBar from "../Navbar/Navbar";
import UserCompte from "../UserCompte/UserCompte";
import Footer from "../Footer/Footer";
// import { useSelector, useDispatch } from "react-redux";
// import EditUser from "./Edituser";
// import { getUser } from "../../Rebux/Utilisateur";

function Profil() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="main bg-dark">
        <UserCompte />
      </main>
      <Footer />
    </>
  );
}

export default Profil;
