import React from "react";
import "./style.css";
import image from "../../resources/cute-pokemon.gif";

const Pokemons = ({ pokemons, loading }) => {
  if (loading) {
    return <img src={image} alt="Loading.." />;
  }
  return (
    <div className="Cartita">
      {pokemons.map((pokemon) => (
        <div>
          <p key={pokemon.id}>{pokemon.name} </p>
          <img src={pokemon.img} alt="" />
          <p>{pokemon.typeOne}</p>
          <p>{pokemon.typeTwo}</p>
        </div>
      ))}
    </div>
  );
};

export default Pokemons;

// export default function Card({ name, image, typeOne, typeTwo }) {
//   return (
//     <div className="Cartita">
//       <p>{name}</p>
//       <img className="PokeImages" src={image} alt={`Pokemon ${name}`} />
//       <p>Type: {typeOne}</p>
//       <p>Type: {typeTwo}</p>
//     </div>
//   );
// }
