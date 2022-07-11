import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findByName } from "../../redux/actions/actionTypes";
import './styles.css'
export default function SearchBar() {
  const allPokes = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [sugestions, setSugestion] = useState([]);


  function handleInputChange(name) {
    let matches = []
    console.log("here be name", typeof name)
    if (name.length > 0) {
      matches = allPokes.filter(pokemon => {
        const regex = new RegExp(`${name}`, "gi");
        return pokemon.name.match(regex);
      }).splice(0, 3)
    }
    setSugestion(matches)
    setName(name);
  }

  function sugestionHandler(name) {
    setName(name);
    setSugestion([])
    dispatch(findByName(name))
  }

  function handleSubmit() {
    dispatch(findByName(name));
  }

  return (
    <div className='searchBar-container'>
      <div className="searchSugestion">
        <input
          // className='generic-input'
          type="text"
          placeholder="Search.."
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={() => {
            setTimeout(() => setSugestion([]), 200)
          }}
        />
        {sugestions?.length ? (
          <div className="sugestion-div">
            <ul className="sugestion-ul">
              {sugestions.map((sugestion, i) =>
                <li
                  className="sugestion-li"
                  key={i}
                  onClick={() => sugestionHandler(sugestion.name)}>{sugestion.name}
                </li>)}
            </ul>
          </div>
        ) : null}
      </div>
      <div>
        <button className='realodButton' type="submit" onClick={(e) => handleSubmit(e.target.value)}>
          Search
        </button>
      </div>
    </div>
  );
}
