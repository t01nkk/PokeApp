// import { GET_POKEMONS, GET_DETAIL, CREATE_POKEMON } from '../actions/actions';

const initialState = {
    pokemons: [],
    // types: []
};

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case "GET_POKEMONS": {
            return {
                ...state,
                pokemons: payload
            }
        };
        default:
            return state;
    }
}

export default reducer;