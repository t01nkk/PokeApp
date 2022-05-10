import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { postPokemon, fetchTypes } from "../../redux/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import style from "./index.css";

export default function Form() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });
  const [errors, setErrors] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(input);
    dispatch(postPokemon(input));
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
    });
    history.push("/pokemons");
  }

  useEffect(() => {
    dispatch(fetchTypes());
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: [e.target.value],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: [e.target.value],
      })
    );
  }

  function handleSelect(event) {
    setInput({
      ...input,
      types: [...input.types, event.target.value],
    });
  }
  function tisNumber(n) {
    if (/^\d+$/.test(n)) {
      return true;
    }
    return false;
  }

  function tisString(n) {
    if (/^\D+$/.test(n)) {
      return true;
    }
    return false;
  }

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Please input a name";
    } else if (!tisString(input.name))
      errors.name = "This field should contain characters Only!";
    if (!input.hp) {
      errors.hp = "Your pokemon most have health!";
    } else if (!tisNumber(input.hp))
      errors.hp = "This field should contain Numbers Only!";
    if (!input.attack) {
      errors.attack = "No attack? Enter a number!";
    } else if (!tisNumber(input.attack))
      errors.attack = "This field should contain Numbers Only!";
    if (!input.defense) {
      errors.defense =
        "This pokemon isn't your inmune system... give it a defense value!";
    } else if (!tisNumber(input.defense))
      errors.defense = "This field should contain Numbers Only!";
    if (!input.speed) {
      errors.speed = "Taking things slow, huh?";
    } else if (!tisNumber(input.speed))
      errors.speed = "This field should contain Numbers Only!";
    if (!input.weight) {
      errors.weight = "Give it some mass";
    } else if (!tisNumber(input.weight))
      errors.weight = "This field should contain Numbers Only!";
    if (!input.height) {
      errors.height = "Not nearly tall enough";
    } else if (!tisNumber(input.height))
      errors.height = "This field should contain Numbers Only!";
    return errors;
  }

  return (
    <div className="grid">
      <h1>Create your pokemon!</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
        <div>
          <label>Name: </label>
          <input
            required
            type="text"
            placeholder="Give me a name!"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="errors">{errors.name}</p>}
        </div>

        <div>
          <label>Health: </label>
          <input
            type="number"
            placeholder="Type a number"
            name="hp"
            value={input.hp}
            onChange={(e) => handleChange(e)}
          />
          {errors.hp && <p className="errors">{errors.hp}</p>}
        </div>

        <div>
          <label>Attack: </label>
          <input
            type="number"
            placeholder="Type a number"
            name="attack"
            value={input.attack}
            onChange={(e) => handleChange(e)}
          />
          {errors.attack && <p className="errors">{errors.attack}</p>}
        </div>

        <div>
          <label>Defense: </label>
          <input
            type="number"
            placeholder="Type a number"
            name="defense"
            value={input.defense}
            onChange={(e) => handleChange(e)}
          />
          {errors.defense && <p className="errors">{errors.defense}</p>}
        </div>

        <div>
          <label>Speed: </label>
          <input
            type="number"
            placeholder="Type a number"
            name="speed"
            value={input.speed}
            onChange={(e) => handleChange(e)}
          />
          {errors.speed && <p className="errors">{errors.speed}</p>}
        </div>

        <div>
          <label>Height: </label>
          <input
            type="number"
            placeholder="Type a number"
            name="height"
            value={input.height}
            onChange={(e) => handleChange(e)}
          />
          {errors.height && <p className="errors">{errors.height}</p>}
        </div>
        <div>
          <label>Weight: </label>
          <input
            type="number"
            placeholder="Type a number"
            name="weight"
            value={input.weight}
            onChange={(e) => handleChange(e)}
          />
          {errors.weight && <p className="errors">{errors.weight}</p>}
        </div>
        <select
          className="typeList"
          onChange={(e) => {
            handleSelect(e);
          }}
        >
          {types.map((e) => {
            return (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            );
          })}
        </select>
        <ul>
          <h5>You can choose more than one</h5>
          <p>Types you chose: {input.types.map((e) => e + ",")}</p>
        </ul>
        <button type="submit" >Create!</button>
      </form>
    </div>
  );
}
// {"img":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
// name;
// hp;
// attack;
// defense;
// speed;
// height;
// weight;
// typeOne;
// typeTwo;
