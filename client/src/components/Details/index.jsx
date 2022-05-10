import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../../redux/actions/actionTypes";
import './styles.css'

export default function Details(props) {
  console.log("this is props: ", props.match.params.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetails(props.match.params.id));
  }, [dispatch]);
  const pokemon = useSelector((state) => state.details);
  console.log(pokemon);
  return (
    <div>
      <div key={pokemon.name}>
        <img src={pokemon.img} alt={`${pokemon.name}'s image`} className='DetailImage' />
        <div className="Details">
          <h1>{pokemon.name}</h1>
          <h2>Health Points {pokemon.hp}</h2>
          <h2>Attack Points{pokemon.attack}</h2>
          <h2>Defense Points {pokemon.defense}</h2>
          <h3>Speed Points {pokemon.speed}</h3>
          <h3>Height {pokemon.height}</h3>
          <h3>Weight {pokemon.weight}</h3>
          <h2>Types: {pokemon.types?.map((e) => e.name + " ")}</h2>
        </div>
      </div>
    </div>
  );
}
