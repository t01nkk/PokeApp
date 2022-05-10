import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Card(pokemon) {
  return (
    <div key={pokemon.pokemon.id} className="card">
      <div className="tittle">
        <h2>{pokemon.pokemon.name}</h2>
      </div>
      <div className="imgContainer">
        <Link to={`/pokemons/${pokemon.pokemon.id}`} key={pokemon.pokemon.id} className="Links">
          <img src={pokemon.pokemon.img} alt={`${pokemon.pokemon.name}`} className="image" />
        </Link>
      </div>
      <div className="types">
        {/* <h5>{pokemon.pokemon.types[0].name}</h5>
        <h5>{pokemon.pokemon.types[1] ? pokemon.pokemon.types[1].name : null}</h5> */}
        <h2 className="types">
          {pokemon.pokemon.types[0].name}
          {`${pokemon.pokemon.types[1] ? ` - ${pokemon.pokemon.types[1].name}` : ""}`}
        </h2>
      </div>
    </div>
  );
}

// import React from "react";
// import "./style.css";
// import { Link } from "react-router-dom";
// export default function Card({ name, img, type1, type2, id }) {
//   return (
//     <>
//       <div className="card">
//         <Link className="text-link" to={/pokemons/${id}}>
//           <div className="infoCard">
//           <h1 className="EarlyGameBoy">{name.toUpperCase()}</h1>
//           <img className="sprite" src={img} alt={Pokemon ${name}} />
//           <h2 className="EarlyGameBoy">
//             {type1}
//             {${type2 ?  - ${type2} : ""}}
//           </h2>
//           </div>
//         </Link>
//       </div>
//     </>
//   );
// }
