import NavBar from "../Navbar/Navbar";
import UserCompte from "../UserCompte/UserCompte";
import Footer from "../Footer/Footer";

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
