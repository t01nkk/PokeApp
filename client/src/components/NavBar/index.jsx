import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./styles.module.css";
import image from "../../resources/pokemonLogo.png";
import Form from "../Form";


export const Navbar = () => {

  const [open, setOpen] = useState(false);



  return (
    <div className={style.navBar}>
      <nav className={style.header}>
        <Link to="/pokemons" className={style.logo}>
          <img src={image} alt="" />
        </Link>
        <ul className={style.ulnkContainer}>
          <li className={style.liContainer}>
            <button
              className={style.aContainer}
              href={null}
              onClick={() => setOpen(!open)}
            // onBlur={() => {
            //   setTimeout(() => setOpen(!open), 200)
            // }}
            >Create a pokemon</button>
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
