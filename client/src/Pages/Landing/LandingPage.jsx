import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import img from "../../resources/Background.jpg";

export default function LandingPage() {
  return (
    <div className='center'>
      <img src={img} alt="Landing Page" className="imagen" />
    </div>
  );
}
