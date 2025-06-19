import React from "react";
import "./Home.css";
import AccountCard from "../components/AccountCard/AccountCard";

function Home() {
  return (
    <>
      <main>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <AccountCard />
        </section>
      </main>
    </>
  );
}
export default Home;
