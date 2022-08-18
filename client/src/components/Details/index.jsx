import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetails } from "../../redux/actions/actionTypes";
import TypeIcon from "../TypeIcon/TypeIcon";
import '../../styles/App.scss'

export default function Details(props) {
  const dispatch = useDispatch();

  const { id } = useParams()
  useEffect(() => {
    dispatch(fetchDetails(id));
  }, [dispatch, id]);

  const pokemon = useSelector((state) => state.details);
  return (
    <div className="detail">
      <img className='detail__image' src={pokemon.img} alt={`${pokemon.name}`} />
      <div className="detail__data">
        <p className="detail__data__name" >{pokemon.name?.toUpperCase()}</p>
        <p >ID: {pokemon.idPoke ? pokemon.idPoke : pokemon.id}</p>
        <p>Health Points {pokemon.hp}</p>
        <p>Attack Points{pokemon.attack}</p>
        <p>Defense Points {pokemon.defense}</p>
        <p>Speed Points {pokemon.speed}</p>
        <p>Height {pokemon.height}</p>
        <p>Weight {pokemon.weight}</p>
        <div className="detail__data__types">
          {pokemon.types && <TypeIcon name={pokemon.types[0].name} />}
          {pokemon.types && pokemon.types[1] && <TypeIcon name={pokemon.types[1].name} />}
        </div>
      </div>
    </div >
  );
}
