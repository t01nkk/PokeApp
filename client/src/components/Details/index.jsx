import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetails } from "../../redux/actions/actionTypes";
import './styles.css'

export default function Details(props) {
  const dispatch = useDispatch();

  const { id } = useParams()
  console.log(id)
  useEffect(() => {
    dispatch(fetchDetails(id));
  }, [dispatch, id]);

  const pokemon = useSelector((state) => state.details);
  return (
    <div className="card2">
      <div className="position">
        <div key={pokemon.name} className='otro'>
          <h2>{pokemon.name}</h2>
          <h3>ID: {pokemon.idPoke ? pokemon.idPoke : pokemon.id}</h3>
          <img src={pokemon.img} alt={`${pokemon.name}`} className='detailImage' />
          <div className="Details">
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
    </div>
  );
}
