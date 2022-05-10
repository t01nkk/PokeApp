import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../../redux/actions/actionTypes";
import './styles.css'

export default function Details(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetails(props.match.params.id));
  }, []);

  const pokemon = useSelector((state) => state.details);

  return (
    <div className="detalles">
      <div key={pokemon.name} className='otro'>
        <img src={pokemon.img} alt={`${pokemon.name}`} className='detailImage' />
        <div className="Details">
          <p>ID: {pokemon.idPoke ? pokemon.idPoke : pokemon.id}</p>
          <p>{pokemon.name}</p>
          <p>Health Points {pokemon.hp}</p>
          <p>Attack Points{pokemon.attack}</p>
          <p>Defense Points {pokemon.defense}</p>
          <p>Speed Points {pokemon.speed}</p>
          <p>Height {pokemon.height}</p>
          <p>Weight {pokemon.weight}</p>
          <p>Types: {pokemon.types?.map((e) => e.name + " ")}</p>
        </div>
      </div>
    </div>
  );
}
