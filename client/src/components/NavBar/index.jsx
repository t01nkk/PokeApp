import React from "react";
import { Link } from "react-router-dom";
import style from "./styles.module.css";
import image from "../../resources/pokemonLogo.png";
import SearchBar from "../SearchBar";
export const Navbar = () => {
  return (
    <div>
      <header className={style.header}>
        <Link to="/" className={style.logo}>
          <img src={image} alt="" />
        </Link>
        <div className="searchBar">
        <SearchBar />
        </div>
        <ul>
          <li>
            <Link to="/pokemons">Pokemons</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
        </ul>
      </header>
    </div>
  );
};
{
  /* <Route exact path='/' component={LandingPage} />
        <Route exact path='/pokemons' component={Home} />
        <Route path='/create' component={Form} />
        <Route path='/pokemons/' component={Details} /> */
}
