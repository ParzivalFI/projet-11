// export const features = [ {
//     title: "un title",
//     image: "./img/argentBankLogo.png",
//     text: "un texte",

//  }]

import React from "react";
import "./Features.css";

// props sous la forme d’un objet destructuré

function Feature({ title, image, description }) {
  return (
    <div className="feature-item">
      <img src={image} alt={`${title} Icon`} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Feature;
