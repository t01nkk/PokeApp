import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import {
  fetchPokemons,
  fetchTypes,
  // filterPokemonsByType,
  // orderPokemon,
  filterPokemons,
  filterByCreated
} from "../../redux/actions/actionTypes";
import Card from "../../components/Card";
import "./styles.css";
import SearchBar from "../../components/SearchBar";
import Filters from "../../helpers/Filters"

export default function Home() {
  const dispatch = useDispatch();
  const allPokes = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(50);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

  useEffect(() => {
    //POKEMONS
    dispatch(fetchPokemons());

  }, [dispatch]);

  useEffect(() => {
    //TYPES
    dispatch(fetchTypes());
  }, [dispatch]);

  function handleClick(e) {
    dispatch(fetchPokemons());
  }

  const currentPokemons = allPokes?.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="ContainerPrincipial">
      <div>
        <div>
          <Filters />
          <div className='searchBar'>
            <SearchBar />
          </div>
        </div>
        <div className="buttonPaginate" >
          <div className="botoncito">
            <button
              className="realodButton"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Reload Pokemons
            </button>
          </div>
          <div className="divPaginado">

            <Pagination

              pokemonsPerPage={pokemonsPerPage}
              totalPokemons={allPokes.length}
              paginate={paginate}
            />
          </div>
        </div>


        <div className="pokePosition">
          {currentPokemons.length ?
            // typeof currentPokemons[0] === 'string' ?
            // <p>{currentPokemons[0]}</p> :
            currentPokemons?.map((e, i) => {
              return (
                <div key={i}>
                  <Card
                    id={e.id}
                    name={e.name}
                    img={e.img}
                    types={e.types}
                  />
                </div>
              );
            }) : <h1>Nothin' to show, you can create your pokemon <a href="/create" style={{ textDecoration: 'none', color: 'red' }}>here</a>!</h1>}
        </div>
        <div>
          <Pagination
            key={allPokes.id}
            pokemonsPerPage={pokemonsPerPage}
            totalPokemons={allPokes.length}
            paginate={paginate}
          />
        </div>


      </div>
    </div>
  );
}
