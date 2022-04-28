import axios from 'axios';
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAIL = "GET_DETAIL";
export const CREATE_POKEMON = "CREATE_POKEMON";

export const loadDbPokemon = async () => dispatch => {
    return await axios('http://localhost:3001/pokemons')
}

export const loadDbTypes = () => dispatch => {
    return axios('http://localhost:3001/types')
        .then(res => res.json)
        .then(types => dispatch({
            type: GET_TYPES,
            payload: types
        }))
}







