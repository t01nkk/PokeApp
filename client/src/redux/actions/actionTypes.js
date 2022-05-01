import axios from "axios";
// export const LOAD_DB = 'LOAD_DB'
export const GET_POKEMONS = "GET_POKEMONS"

export function showPokemons() {
    return async function (dispatch) {
        try {
            const fetchedPokes = await axios("http://localHost:3001/pokemon");
            await axios("http://localhost:3001/types");
            return dispatch({
                type: GET_POKEMONS,
                payload: fetchedPokes.data
            })
        } catch (err) {
            console.log({ msg: err.message })
        }
    }
}









