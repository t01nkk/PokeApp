import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import image from "../../resources/Background.jpg";

export default function LandingPage() {
  // useEffect(() =>{
  //   const fetchData =async() =>{
  //     await axios('http://localhost:3001/types');
  //     console.log('Types Creado!')
  // }
  //   fetchData()
  //   .catch(console.error)
  // },[])

  return (
    <div className="clap">
      <button>
        {/* <img className="center" src={image} alt="tetas" /> */}
        <Link to={"/pokemons"}>To pokemons!</Link>
      </button>
    </div>
  );
}
