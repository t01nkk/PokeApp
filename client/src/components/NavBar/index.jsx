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
        <ul className="navbar__header__ul">
          <li className="navbar__header__ul__li">
            <a
              className="navbar__header__ul__li_a"
              href={null}
              onClick={() => setOpen(!open)}
              onBlur={() => {
                setTimeout(() => setOpen(!open), 200)
              }}
            >Create a pokemon</a>
            {open && <Form />}
          </li>
          {/* <li>
            <Link to="/pokemons">Pokemons</Link>
          </li> */}
          {/* <li>
            <Link to="/create">Create</Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};
