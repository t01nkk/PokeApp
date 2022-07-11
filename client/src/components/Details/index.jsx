import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetails } from "../../redux/actions/actionTypes";
import TypeIcon from "../TypeIcon/TypeIcon";
import './styles.css'

export default function Details(props) {
  const dispatch = useDispatch();

  const { id } = useParams()
  useEffect(() => {
    dispatch(fetchDetails(id));
  }, [dispatch, id]);

  const pokemon = useSelector((state) => state.details);
  return (
    <div className="detail-container">
      <div className="tittle-image-pos">
        <div className="detail-tittle">
          <p className="pokemon-name">{pokemon.name}</p>
          <p className="pokemon-id">ID: {pokemon.idPoke ? pokemon.idPoke : pokemon.id}</p>
        </div>
        <br />
        <div >
          <img className='detail-image' src={pokemon.img} alt={`${pokemon.name}`} />

        </div>
      </div>
      <div className="detail-data">
        <p>Health Points {pokemon.hp}</p>
        <p>Attack Points{pokemon.attack}</p>
        <p>Defense Points {pokemon.defense}</p>
        <p>Speed Points {pokemon.speed}</p>
        <p>Height {pokemon.height}</p>
        <p>Weight {pokemon.weight}</p>
        {/* <p>Types: {pokemon.types?.map((e) => e.name + " ")}</p> */}
        <p>Types:</p>
        <div className="detail-types">
          {pokemon.types && <TypeIcon name={pokemon.types[0].name} />}
          {pokemon.types && pokemon.types[1] && <TypeIcon name={pokemon.types[1].name} />}
        </div>
      </div>
    </div>
  );
}
