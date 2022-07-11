const initialState = {
    pokemons: [],
    allPokemons: [],
    order: [],
    types: [],
    details: []
};

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case "GET_POKEMONS": {
            return {
                ...state,
                pokemons: payload,
                allPokemons: payload
            }
        };
        case "GET_TYPES": {
            return {
                ...state,
                types: payload
            }
        };

        case "FILTER_BY_CREATED": {
            const allPoke = state.allPokemons;
            const filterByCreated =
                payload === 'Created' ?
                    allPoke.filter(poke => poke.createdDb) :
                    allPoke.filter(poke => !poke.createdDb);
            return {
                ...state,
                pokemons: payload === 'All' ? allPoke : filterByCreated
            }
        }
        case "FILTERS": {
            return {
                ...state,
                pokemons: payload
            }
        }
        case "ORDER": {
            return {
                ...state,
                pokemons: payload
            }
        }
        case "GET_DETAILS": {
            return {
                ...state,
                details: payload
            }
        }
        case "FIND_BY_NAME": {
            return {
                ...state,
                pokemons: payload
            }
        }
        case "CREATE_POKEMON": {
            return {
                ...state
            }
        }
        default:
            return state;
    }
}

export default reducer;