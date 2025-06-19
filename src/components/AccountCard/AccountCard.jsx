import React from "react";
import "./AccountCard.css";
import Feature from "../Features/Features";
import { features } from "../Features/listfeatures";

function AccountCard() {
  const Featurescard = features.map((feature) => {
    return (
      <Feature
        image={feature.image}
        title={feature.title}
        description={feature.description}
      />
    );
  });
  return (
    <div>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {Featurescard}
      </section>
    </div>
  );
}

export default AccountCard;
