import React from "react";
import "../../styles/App.scss";
import img from "../../resources/Background-image.png";

export default function LandingPage() {
  return (
    <div className='landing'>
      <img src={img} alt="Landing Page" className="landing__image" />
    </div>
  );
}
