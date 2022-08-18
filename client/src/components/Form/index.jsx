import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { postPokemon, fetchTypes } from "../../redux/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import TypeIcon from "../TypeIcon/TypeIcon";
import '../../styles/App.scss'

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
    image: "",
    types: [],
  });
  const [errors, setErrors] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (Object.values(errors).length) {
      let message = ''
      console.log(message)
      let err = Object.values(errors)
      return alert(message = err.map(e => e + '\n'))
    } else {
      const { name, hp, attack, defense, speed, image, height, weight, types } = input;
      if (name && hp && attack && defense && speed && height && weight && types.length !== 0) {
        dispatch(postPokemon(input));

        alert('Pokemon created successfully!')
      } else alert("Some field is missing information");
      setInput({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        types: [],
      });
      history.push("/pokemons");
    }
  }

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: [e.target.value],
      })
    );

  }

  function handleClearTypes(event) {
    setInput({
      ...input,
      types: []
    })
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

    } else if (!tisString(input.name)) errors.name = "characters only";

    else if (!input.hp) errors.hp = "missing value";

    else if (!tisNumber(input.hp)) errors.hp = "numbers only";

    else if (!input.attack) errors.attack = "missing value";

    else if (!tisNumber(input.attack)) errors.attack = "numbers only";

    else if (!input.defense) errors.defense = "missing value";

    else if (!tisNumber(input.defense)) errors.defense = "numbers only";

    else if (!input.speed) errors.speed = "missing value";

    else if (!tisNumber(input.speed)) errors.speed = "numbers only";

    else if (!input.weight) errors.weight = "missing value";

    else if (!tisNumber(input.weight)) errors.weight = "numbers only";

    else if (!input.height) errors.height = "missing value";

    else if (!tisNumber(input.height)) errors.height = "numbers only";
    // if (input.types.length === 0) errors.types = "You must choose a Type for your pokemon!!"
    return errors;
  }
  return (
    <div className="form">
      {/* <p className="form-tittle">Create your pokemon!</p> */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='form__layout' >
        <div >
          <input
            className='generic-input'
            required
            type="text"
            placeholder="Name"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="errors">{errors.name}</p>}
        </div>

        <div>
          <input
            className='generic-input'
            type="number"
            placeholder="Health"
            name="hp"
            value={input.hp}
            onChange={(e) => handleChange(e)}
          />
          {errors.hp && <p className="errors">{errors.hp}</p>}
        </div>

        <div>
          <input
            className='generic-input'
            type="number"
            placeholder="Attack"
            name="attack"
            value={input.attack}
            onChange={(e) => handleChange(e)}
          />
          {errors.attack && <p className="errors">{errors.attack}</p>}
        </div>

        <div>
          <input
            className='generic-input'
            type="number"
            placeholder="Defense"
            name="defense"
            value={input.defense}
            onChange={(e) => handleChange(e)}
          />
          {errors.defense && <p className="errors">{errors.defense}</p>}
        </div>

        <div>
          <input
            className='generic-input'
            type="number"
            placeholder="Speed"
            name="speed"
            value={input.speed}
            onChange={(e) => handleChange(e)}
          />
          {errors.speed && <p className="errors">{errors.speed}</p>}
        </div>

        <div>
          <input
            className='generic-input'
            type="number"
            placeholder="Height"
            name="height"
            value={input.height}
            onChange={(e) => handleChange(e)}
          />
          {errors.height && <p className="errors">{errors.height}</p>}
        </div>
        <div>
          <input
            className='generic-input'
            type="number"
            placeholder="Weight"
            name="weight"
            value={input.weight}
            onChange={(e) => handleChange(e)}
          />
          <div>
            {errors.weight && <p className="errors">{errors.weight}</p>}

          </div>
        </div>
        <input
          className="generic-input"
          type="text"
          name="image"
          placeholder={("pick an image")}
          onChange={(e) => handleChange(e)}
          value={input.image}
        />
        <select
          className='generic-input'
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



        <div className="form-types">
          <ul>
            {/* <p>Types you chose:</p> */}
            {input.types.map((e) => (<TypeIcon name={e} />))}
          </ul>
        </div>
        <ul>
          <li>

            <a href={null} onClick={handleClearTypes} >Clear</a>
          </li>
          <li>
            <button className="form__submit" type="submit" >Create!</button>
          </li>
        </ul>
      </form>
    </div>
  );
}
