import React from "react";

export const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <div>
        {pageNumber.map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)} href="!#">
              {number}
            </button>
          </li>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
