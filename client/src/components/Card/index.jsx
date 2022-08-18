import React from "react";
import { Link } from "react-router-dom";
import "../../styles/App.scss";
import TypeIcon from "../TypeIcon/TypeIcon";

export default function Card({ id, name, img, types }) {
  return (
    <div className="card">
      <div className="card__tittle">
        <p>{name}</p>
      </div>
      <div >
        <Link to={`/pokemons/${id}`}>
          <img src={img} alt={`${name}`} className="card__image" />
        </Link>
      </div>
      <div className="card__types">
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
