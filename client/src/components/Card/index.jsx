import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import TypeIcon from "../TypeIcon/TypeIcon";

export default function Card({ id, name, img, types }) {
  return (
    <div className="card">
      <div className="tittle">
        <p>{name}</p>
      </div>
      <div className="imgContainer">
        <Link to={`/pokemons/${id}`}>
          <img src={img} alt={`${name}`} className="image" />
        </Link>
      </div>
      <div className="types">
        {types && <TypeIcon name={types[0].name} />}
        {types && types[1] && <TypeIcon name={types[1].name} />}
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
