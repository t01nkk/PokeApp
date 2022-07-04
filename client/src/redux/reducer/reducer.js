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
                pokemons: [payload]
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


    // case "ORDER_NAME": {
    //     return {
    //         ...state,
    //         order: payload === 'A-Z' ? state.pokemons.sort((a, b) => a.name.localeCompare(b.name)) : state.pokemons.sort((a, b) => b.name.localeCompare(a.name))
    //     }
    // }
    // case "ORDER_ATTACK": {
    //     const atk = payload === "Attack +" ?
    //         state.pokemons.sort((a, b) => {
    //             if (b.attack > a.attack) {
    //                 return 1;
    //             } else if (a.attack > b.attack) {
    //                 return -1;
    //             } else return 0;
    //         }) :
    //         state.pokemons.sort((a, b) => {
    //             if (b.attack > a.attack) {
    //                 return -1;
    //             } else if (b.attack > a.attack) {
    //                 return 1;
    //             } else return 0;
    //         })
    //     return {
    //         ...state,
    //         order: atk
    //     }
    // }
    // case "FILTER_TYPE": {
    //     const allTypes = state.allPokemons;
    //     const filteredByType =
    //         payload === "All" ?
    //             allTypes :
    //             allTypes.filter(e =>
    //                 e.types[0].name === payload || e.types[1]?.name === payload
    //             )

    //     return {
    //         ...state,
    //         pokemons: filteredByType
    //     }
    // };