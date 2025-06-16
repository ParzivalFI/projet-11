import Footer from "../Footer/Footer";
import ModalLogin from "../Sign-In/ModalLogin";
import NavBar from "../Navbar/Navbar";
import "./connexion.css";

function Connexion() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="main bg-dark">
        <ModalLogin />
      </main>
      <Footer />
    </>
  );
}

export default Connexion;
