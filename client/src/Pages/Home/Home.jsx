import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import {
  fetchPokemons,
  fetchTypes,
  filterPokemonsByType,
  filterByCreated,
  OrderingByName,
  OrderingByAttack
} from "../../redux/actions/actionTypes";
import Card from "../../components/Card";
import "./styles.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokes = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(10);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const [order, setOrder] = useState("");

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

  const currentPokemons = allPokes.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //FILTER STATUS
  function handleFilterStatus(event) {
    dispatch(filterPokemonsByType(event.target.value));
  }

  //FILTER CREATE
  function handleFilterCreated(event) {
    dispatch(filterByCreated(event.target.value));
  }

  //ORDER NAME
  function handleOrder(event) {
    event.preventDefault();
    dispatch(OrderingByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Order ${event.target.value}`);
  }

  function handleOrderAttack(event) {
    event.preventDefault();
    dispatch(OrderingByAttack(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }


  return (
    <div>
      <div className="titulo">
        <h1>Pokemon</h1>
      </div>
      <div>
        <button
          className="realodButton"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload Pokemons
        </button>
        <div className="filters">
          <div>
            <label>Order by name</label>
            <select onChange={(e) => handleOrder(e)} name="Alphabetical Order">
              <option value="Any" hidden={true}>Default</option>
              <option value="A-Z">Order A-Z</option>
              <option value="Z-A">Order Z-A</option>
            </select>
          </div>

          <div>
            <label>Order by attack</label>
            <select onChange={(e) => handleOrderAttack(e)} name="Order by attack">
              <option value="Any" hidden={true}>Default</option>
              <option value="Attack +">Attack +</option>
              <option value="Attack -">Attack -</option>
            </select>
          </div>

          <div>
            <label>Created</label>
            <select
              onChange={(e) => handleFilterCreated(e)}
              name="Filter by Pokemon Created by you"
            >
              <option value="All" hidden={true}>All </option>
              <option value="Created">Created </option>
              <option value="Pokemon">Not created</option>
            </select>
          </div>
          <div>
            <label>Filter by Type</label>
            <select
              onChange={(e) => handleFilterStatus(e)}
              name="Filter by Pokemon Type"
            >
              <option value="All" hidden={true}>All </option>
              {allTypes.map((type) => {
                return <option value={type.name}>{type.name}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="pokePosition">
          {currentPokemons.length ?
            currentPokemons?.map((pokemon) => {
              return (
                <div>
                  <Card pokemon={pokemon} key={pokemon.id} />
                </div>
              );
            }) : <h1>Nothin' to show, you can create your pokemon <a href="/create" style={{ textDecoration: 'none', color: 'red' }}>here</a>!</h1>}
        </div>

        <div>
          <Pagination
            pokemonsPerPage={pokemonsPerPage}
            totalPokemons={allPokes.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}