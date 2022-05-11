import React from "react";
import "./styles.css";
import img from "../../resources/Background-image.png";

export default function LandingPage() {
  return (
    <div className='center'>
      <img src={img} alt="Landing Page" className="imagen" />
    </div>
  );
}
