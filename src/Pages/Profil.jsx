import NavBar from "../components/Navbar/Navbar";
import UserCompte from "../components/UserCompte/UserCompte";
import Footer from "../components/Footer/Footer";

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
