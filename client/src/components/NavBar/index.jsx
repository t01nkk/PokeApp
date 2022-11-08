import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../styles/App.scss'
import image from "../../resources/pokemonLogo.png";
import Form from "../Form";


export const Navbar = () => {

  const [open, setOpen] = useState(false);



  return (
    <div className='navbar'>
      <nav className='navbar__header'>
        <Link to="/pokemons" >
          <img className='navbar__header__image' src={image} alt="" />
        </Link>
        <Link to="/create" >
          <button>Create a Pokemon!</button>
        </Link>
      </nav>
    </div>
  );
};
