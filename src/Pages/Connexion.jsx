import Footer from "../components/Footer/Footer";
import ModalLogin from "../components/Sign-In/ModalLogin";
import NavBar from "../components/Navbar/Navbar";
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
