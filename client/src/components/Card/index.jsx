import React from "react";
import { Link } from "react-router-dom";
import style from "./styles.css";

export default function Card(pokemon) {
  return (
    <div key={pokemon.pokemon.id} className="card">
      <div className="tittle">
        <h3>{pokemon.pokemon.name}</h3>
      </div>
      <div className="imgContainer">
        <Link to={`/pokemons/${pokemon.pokemon.id}`} key={pokemon.pokemon.id} className="Links">
          <img src={pokemon.pokemon.img} alt={`image`} className="image" />
        </Link>
      </div>
      <div className="types">
        <h5>{pokemon.pokemon.types[0].name}</h5>
        <h5>{pokemon.pokemon.types[1] ? pokemon.pokemon.types[1].name : null}</h5>
      </div>
    </div>
  );
}
