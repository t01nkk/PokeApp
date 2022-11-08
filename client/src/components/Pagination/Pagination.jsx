import React from "react";
import { useState } from "react";
import "../../styles/App.scss"

export const Pagination = ({ currentPage, lastPage, paginate }) => {

  return (
    <nav className="pagination">
      {currentPage - 1 > 0 ?
        <button onClick={() => paginate(currentPage - 1)} href="!#" className="pagination__button" >
          ⬅
        </button> :
        <button href="!#" className="pagination__disable" >
          ⬅
        </button>
      }

      {currentPage !== 1 ?
        <button onClick={() => paginate(1)} href="!#" className="pagination__button" >
          First
        </button> :
        <button href="!#" className="pagination__disable" >
          First
        </button>
      }

      {currentPage - 2 > 0 ?
        <button onClick={() => paginate(currentPage - 2)} href="!#" className="pagination__button" >
          -..
        </button> :
        <button href="!#" className="pagination__disable" >
          -..
        </button>
      }

      {currentPage - 1 > 0 &&
        <button onClick={() => paginate(currentPage - 1)} href="!#" className="pagination__button" >
          {currentPage - 1}
        </button>}

      <button href="!#" className="pagination__disable" >
        {currentPage}
      </button>

      {currentPage < lastPage && <button onClick={() => paginate(currentPage + 1)} href="!#" className="pagination__button" >
        {currentPage + 1}
      </button>}

      {currentPage + 2 < lastPage ?
        <button onClick={() => paginate(currentPage + 2)} href="!#" className="pagination__button" >
          ..+
        </button> :
        <button href="!#" className="pagination__disable" >
          ..+
        </button>
      }

      {currentPage !== lastPage ?
        <button onClick={() => paginate(lastPage)} href="!#" className="pagination__button">
          Last
        </button> :
        <button href="!#" className="pagination__disable">
          Last
        </button>
      }

      {currentPage + 1 <= lastPage ?
        <button onClick={() => paginate(currentPage + 1)} href="!#" className="pagination__button">
          ➡
        </button> :
        <button href="!#" className="pagination__disable">
          ➡
        </button>
      }

    </nav>
  );
};

export default Pagination;
// import React from "react";
// import "../../styles/App.scss"

// export const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }) => {
//   const pageNumber = [];
//   for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
//     pageNumber.push(i);
//   }
//   return (
//     <nav className="pagination">
//       <div>
//         {pageNumber &&
//           pageNumber.map((number) => (
//             <button onClick={() => paginate(number)} href="!#" className="pagination__button" key={number}>
//               {number}
//             </button>
//           ))}
//       </div>
//     </nav>
//   );
// };

// export default Pagination;
