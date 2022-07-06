import React from "react";
import { Link } from "react-router-dom";
import style from "./styles.module.css";
import image from "../../resources/pokemonLogo.png";
export const Navbar = () => {
  return (
    <div className={style.navBar}>
      <nav className={style.header}>
        <Link to="/" className={style.logo}>
          <img src={image} alt="" />
        </Link>
        <ul>
          <li>
            <Link to="/pokemons">Pokemons</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
