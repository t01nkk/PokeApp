import React from "react";
import "../../styles/App.scss"

export const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav className="pagination">
      <div>
        {pageNumber &&
          pageNumber.map((number) => (
            <button onClick={() => paginate(number)} href="!#" className="pagination__button" key={number}>
              {number}
            </button>
          ))}
      </div>
    </nav>
  );
};

export default Pagination;
