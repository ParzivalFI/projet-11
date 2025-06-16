import React from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import AccountCard from "../AccountCard/AccountCard";

function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <AccountCard />
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Home;
