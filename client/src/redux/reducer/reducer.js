import { GET_POKEMONS, GET_DETAIL, CREATE_POKEMON } from '../actions/actions';

const initialState = {
    pokemons: [],
    types: []
};

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_POKEMONS: {
            return {
                ...state,
                pokemons: payload.data
            }
        };
        // case GET_TYPES: {
        //     return {
        //         ...state,
        //         types: payload.data
        //     }
        // }
        // case GET_DETAIL: {
        //     return {
        //         ...state,
        //         pokemon: payload.data
        //     }
        // };
        // case CREATE_POKEMON: {
        //     return {
        //         ...state,
        //         pokemon: state.pokemons.concat(action.payload)
        //     }
        // };
        default:
            return state;
    }
}

export default reducer;