const { Pokemon, Types } = require('../db')
const axios = require('axios');


const getPoke = async () => {
    const pokemons = await axios('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000');
    const mapUrl = await pokemons.data.results.map(e => { return e.url })
    var arrayPokemones = [];
    for (var i = 0; i < mapUrl.length; i++) {
        const url = await axios(mapUrl[i])
        arrayPokemones.push({
            idPoke: url.data.id,
            name: url.data.name,
            height: url.data.height,
            weight: url.data.weight,
            hp: url.data.stats.find(e => e.stat.name === 'hp').base_stat,
            attack: url.data.stats.find(e => e.stat.name === 'attack').base_stat,
            defense: url.data.stats.find(e => e.stat.name === 'defense').base_stat,
            speed: url.data.stats.find(e => e.stat.name === 'speed').base_stat,
            types: url.data.types.map(e => e = { name: e.type.name }),
            // img: url.data.sprites.versions['generation-v']['black-white'].animated.front_default,
            img: url.data.sprites.other["official-artwork"].front_default,
        }
        );
    }
    return arrayPokemones;
}

const populateTypes = async function () {
    let typesInDb = []
    try {
        typesInDb = await Types.findAll({ where: { createdDb: true } })
        const isPopulated = await Types.count();
        if (isPopulated === typesInDb.length) {
            const api = await axios.get('https://pokeapi.co/api/v2/type');
            const apiTypes = api.data.results.map(e => e.name)
            for (let i = 0; i < apiTypes.length; i++) {
                Types.findOrCreate({
                    where: { name: apiTypes[i] }
                })
            }
        }
        console.log("Types Loaded..", await Types.count());
    } catch (err) {
        console.log(err.message);
    }
}

const createFromApi = async function () {
    try {
        const pokemonsInDb = await Pokemon.findAll({ where: { createdDb: true } }) //agarro todos los creados por usuario
        const count = await Pokemon.count(); //cuento cuantos hay en la base de datos
        if (pokemonsInDb.length === count) { // comparo, si son iguales, quiere decir que en la base de datos solo hay pokemones creados por el usuario
            const apiPoke = await getPoke();
            // console.log("ACA ESTA EL POKE", apiPoke[apiPoke.length - 1]);
            for (var i = 0; i < apiPoke.length; i++) {
                let newPoke = await Pokemon.create({
                    idPoke: apiPoke[i].idPoke,
                    name: apiPoke[i].name,
                    height: apiPoke[i].height,
                    weight: apiPoke[i].weight,
                    hp: apiPoke[i].hp,
                    attack: apiPoke[i].attack,
                    defense: apiPoke[i].defense,
                    speed: apiPoke[i].speed,
                    img: apiPoke[i].img
                })
                let typeDb = await Types.findAll({ where: { name: apiPoke[i].types[0].name } })
                newPoke.addType(typeDb);
                if (apiPoke[i].types[1]) {
                    let typeDb2 = await Types.findAll({ where: { name: apiPoke[i].types[1].name } })
                    newPoke.addType(typeDb2);
                }
            }

        }
        console.log("Pokemons Loaded..", await Pokemon.count());
    } catch (err) {
        console.log(err.message);
    }
}



const loadDb = async function () {
    await populateTypes();
    await createFromApi();
}

const filters = async (typeFilter, orderBy) => {
    console.log(orderBy)
    try {
        var filterType = await Pokemon.findAll({
            include: {  //incluye el modelo Types
                model: Types,
                where: { 'name': typeFilter }, // dentrro de la inclución filtro los que tienen el nombre que busco
                attributes: ['name'],
                through: { attributes: [] }
            },
        })
        if (filterType.length) { // Checkeo si encontró algo
            if (orderBy) return setOrder(filterType, orderBy);
            console.log("filterType")
            return filterType
        }
    } catch (err) {
        console.log(err.message)
        throw new Error({ msg: err.message })
    }
}

const setOrder = (pokemon, by) => {
    switch (by) {
        case "attackUp": {
            return pokemon.sort((a, b) => b.attack - a.attack)
        };
        case "attackDown": {
            return pokemon.sort((a, b) => a.attack - b.attack)
        };
        case "nameUp": {
            return pokemon.sort((a, b) => a.name.localeCompare(b.name))
        };
        case "nameDown": {
            return pokemon.sort((a, b) => b.name.localeCompare(a.name))
        };
        default: return pokemon;
    }
}




module.exports = {
    loadDb,
    setOrder,
    filters
};

