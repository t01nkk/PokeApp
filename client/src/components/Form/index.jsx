import React from "react";
import { useState } from "react";

export default function Form() {
  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    def: "",
    speed: "",
    height: "",
    weight: "",
    typeOne: "",
    typeTwo: "",
    img: "",
  });
  const [error, setError] = useState({
    name: "",
    hp: "",
    attack: "",
    def: "",
    speed: "",
    height: "",
    weight: "",
    typeOne: "",
    typeTwo: "",
    img: "",
  });

  function handleChange(event) {
    setInput((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <div>
      <form>
        <label>Name: </label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={input.name}
          onChange={handleChange}
          className={error && "danger"}
        />
        <label>Health: </label>
        <input
          type="text"
          placeholder="Health"
          name="hp"
          value={input.hp}
          onChange={handleChange}
          className={error && "danger"}
        />
        <label>Attack: </label>
        <input
          type="text"
          placeholder="Attack"
          name="attack"
          value={input.attack}
          onChange={handleChange}
          className={error && "danger"}
        />
        <label>Defense: </label>
        <input
          type="text"
          placeholder="Defense"
          name="def"
          value={input.def}
          onChange={handleChange}
          className={error && "danger"}
        />
        <label>Speed: </label>
        <input
          type="text"
          placeholder="Speed"
          name="speed"
          value={input.speed}
          onChange={handleChange}
          className={error && "danger"}
        />
        <label>Height: </label>
        <input
          type="text"
          placeholder="Height"
          name="height"
          value={input.height}
          onChange={handleChange}
          className={error && "danger"}
        />
        <label>Weight: </label>
        <input
          type="text"
          placeholder="Weight"
          name="weight"
          value={input.weight}
          onChange={handleChange}
          className={error && "danger"}
        />
        <label>Type: </label>
        <input
          type="text"
          placeholder="Type"
          name="typeOne"
          value={input.typeOne}
          onChange={handleChange}
          className={error && "danger"}
        />
        <label>Second Type: </label>
        <input
          type="text"
          placeholder="Second"
          name="typeTwo"
          value={input.typeTwo}
          onChange={handleChange}
          className={error && "danger"}
        />
        <label>Upload your Pokemon Image: </label>
        <input
          type="text"
          placeholder="image path here"
          name="img"
          value={input.img}
          onChange={handleChange}
          className={error && "danger"}
        />
      </form>
    </div>
  );
}
// {"img":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
// name;
// hp;
// attack;
// def;
// speed;
// height;
// weight;
// typeOne;
// typeTwo;
