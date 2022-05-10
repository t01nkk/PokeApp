import axios from "axios";


export function fetchPokemons() {
    return async function (dispatch) {
        try {
            const fetchedPokes = await axios("http://localHost:3001/pokemons");
            return dispatch({
                type: "GET_POKEMONS",
                payload: fetchedPokes.data
            })
        } catch (err) {
            console.log({ msg: err.message })
        }
    }
}

export function fetchTypes() {
    return async function (dispatch) {
        try {
            const fetchedTypes = await axios("http://localHost:3001/types");
            return dispatch({
                type: "GET_TYPES",
                payload: fetchedTypes.data
            })
        } catch (err) {
            console.log({ msg: err.message })
        }
    }
}

export function findByName(name) {
    return async function (dispatch) {
        try {
            const pokeName = await axios(`http://localhost:3001/pokemons?name=${name}`)
            return dispatch({
                type: "FIND_BY_NAME",
                payload: pokeName.data
            })
        } catch (err) {
            console.log({ msg: "This Pokemon doesn't exist" })
        }
    }
}

export function postPokemon(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/create', payload);
        return dispatch({
            type: "CREATE_POKEMON",
            response
        })
    }
}

export function fetchDetails(id) {
    return async function (dispatch) {
        const details = await axios("http://localhost:3001/pokemons/" + id);
        return dispatch({
            type: "GET_DETAILS",
            payload: details.data
        })
    }
}

export function filterPokemonsByType(payload) {
    return {
        type: "FILTER_TYPE",
        payload
    }
}

export function filterByCreated(payload) {
    return {
        type: "FILTER_BY_CREATED",
        payload
    }
}

export function OrderingByName(payload) {
    return {
        type: 'ORDER_NAME',
        payload
    }
}

export function OrderingByAttack(payload) {
    return {
        type: 'ORDER_ATTACK',
        payload
    }
}









