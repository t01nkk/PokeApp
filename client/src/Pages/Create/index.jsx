import React from "react";
import Form from "../../components/Form";
import { Link } from "react-router-dom";

export default function Create() {
  return (
    <div>
      <button>
        <Link to={"/pokemons"} className="button">
          Back to pokemons
        </Link>
      </button>
      <Form />
      <button>
        <Link to={""}>Submit</Link>
      </button>
    </div>
  );
}
