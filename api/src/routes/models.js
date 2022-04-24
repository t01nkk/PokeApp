const { Pokemon } = require('../db')
const axios = require('axios');

const getPoke = async () => {
    const pokemons = await axios('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40');
    const mapUrl = await pokemons.data.results.map(e => { return e.url })
    var arr = [];
    for (var i = 0; i < mapUrl.length; i++) {
        const url = await axios(mapUrl[i])
        arr.push({
            name: url.data.name,
            height: url.data.height,
            weight: url.data.weight,
            hp: url.data.stats.find(e => e.stat.name === 'hp').base_stat,
            defense: url.data.stats.find(e => e.stat.name === 'defense').base_stat,
            speed: url.data.stats.find(e => e.stat.name === 'speed').base_stat,
            attack: url.data.stats.find(e => e.stat.name === 'attack').base_stat
        }
        );
    }
    //UwU//
    return arr;
}

const getInfodb = async function () {
    return await Pokemon.findAll();
}

module.exports = { getPoke, getInfodb };

// ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
// Nombre *
// Vida
// Fuerza
// Defensa
// Velocidad
// Altura
// Peso

// GET https://pokeapi.co/api/v2/pokemon
// GET https://pokeapi.co/api/v2/pokemon/{id}
// GET https://pokeapi.co/api/v2/pokemon/{name}
// GET https://pokeapi.co/api/v2/type