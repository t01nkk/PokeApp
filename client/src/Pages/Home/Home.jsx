import React from "react";
import { useEffect, useState } from "react";
import Pokemons from "../../components/PokemonCards/index";
import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import "./styles.css";
import { useDispatch } from "react-redux";
import { showPokemons } from "../../redux/actions/actionTypes";
import axios from "axios";
// import imagen from "../resources/charmander-cute.gif";

export default function Home() {
  const dispatch = useDispatch();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(10);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const res = await axios("http://localHost:3001/pokemon");
      setPokemons(res.data);
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemon = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Pokemons
        pokemons={currentPokemon}
        loading={loading}
        // className="tabienNoMePegues"
      ></Pokemons>
      <Pagination
        pokemonsPerPage={pokemonsPerPage}
        totalPokemons={pokemons.length}
        paginate={paginate}
      />
    </div>
  );
}
// export default function Home() {
//   const dispatch = useDispatch();

//   useEffect(async () => {
//     debugger;
//     await dispatch(showPokemons());
//     console.log(gottenPokemons);
//     nextPage();
//   }, [dispatch]);

//   const gottenPokemons = useSelector((state) => state.pokemons);
//   // console.log(gottenPokemons);
//   var arr = [];

//   function Paginado(p) {
//     for (var i = 0; i < Math.floor(gottenPokemons.length / 10); i++) {
//       let init = 0;
//       let end = 9;
//       const leftSlice = gottenPokemons.slice(init, end);
//       arr.push(leftSlice);
//       init += 10;
//       end += 10;
//       return arr[p];
//     }
//   }

//   var pagina = 1;
//   var pokemonArr;
//   function nextPage() {
//     pagina++;
//     pokemonArr = Paginado(pagina);
//   }

//   function lastPage() {
//     pagina--;
//     Paginado(pagina);
//   }
//   console.log(pokemonArr);

//   return (
//     <div>
//       <button className="button">
//         <Link to={"/"} className="Link">
//           Back To the top!
//         </Link>
//       </button>
//       <button>
//         <Link to={"/create"}>Create A Pokemon!</Link>
//       </button>
//       <div className="tabienNoMePegues">
//         {/* {gottenPokemons.length ? (
//           gottenPokemons.map((pokemons) => (
//             <Card
//               key={pokemons.idPoke}
//               name={pokemons.name}
//               image={pokemons.img}
//               typeOne={pokemons.typeOne}
//               typeTwo={pokemons.typeTwo}
//             />
//           ))
//         ) : (
//           <h1>Loading..</h1>
//         )} */}
//         {pokemonArr && pokemonArr.length ? (
//           pokemonArr.map((pokemons) => (
//             <Card
//               key={pokemons.idPoke}
//               name={pokemons.name}
//               image={pokemons.img}
//               typeOne={pokemons.typeOne}
//               typeTwo={pokemons.typeTwo}
//             />
//           ))
//         ) : (
//           <h1>Loading..</h1>
//         )}
//       </div>
//       {/* <button onClick={nextPage()}>Siguiente Página</button>
//       <button onClick={nextPage()}>{pagina}</button>;
//       <button onClick={nextPage()}>Pagina Anterior</button> */}
//     </div>
//   );
// }

// const fetchPoke = async () => {
//   const foundPoke = await axios.get("http://localHost:3001/pokemons");
//   setPokemons(foundPoke.data);
// };
// // console.log(pokemons);
// const dispatch = useDispatch();
// useEffect(() => {
//   dispatch(loadDb());
//   // dispatch(showPokemons());
// }, [dispatch]);
