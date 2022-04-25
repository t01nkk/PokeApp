const { Pokemon, Types } = require('../db')
const axios = require('axios');

const getPoke = async () => {
    const pokemons = await axios('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10');
    const mapUrl = await pokemons.data.results.map(e => { return e.url })
    var dbPoke = [];
    for (var i = 0; i < mapUrl.length; i++) {
        const url = await axios(mapUrl[i])
        // console.log(url.data.sprites.other["official-artwork"], ' HOLA SOY FRONT DEFAULT')
        dbPoke.push({
            idPoke: url.data.id,
            name: url.data.name,
            height: url.data.height,
            weight: url.data.weight,
            hp: url.data.stats.find(e => e.stat.name === 'hp').base_stat,
            defense: url.data.stats.find(e => e.stat.name === 'defense').base_stat,
            speed: url.data.stats.find(e => e.stat.name === 'speed').base_stat,
            attack: url.data.stats.find(e => e.stat.name === 'attack').base_stat,
            img: url.data.sprites.other["official-artwork"].front_default,
            typeOne: url.data.types[0].type.name,
            typeTwo: url.data.types[1] ? url.data.types[1].type.name : null,
        }
        );
    }
    return dbPoke;
}

const getPokeDb = async function () {
    return await Pokemon.findAll();
}

const getTypes = async () => {
    let getting = await axios('https://pokeapi.co/api/v2/type');
    arrTypes = []
    for (var i = 0; i < getting.data.results.length; i++) {
        arrTypes.push({
            id: getting.data.results[i].id,
            name: getting.data.results[i].name
        })
    }
    // allTypes = allTypes.data.results.map(e => e.name)
    // return allTypes;
    return arrTypes;
}

const getTypesDb = async function () {
    return await Types.findAll();
}

const createNewPoke = async function (img, name, typeOne, typeTwo, hp, attack, def, speed, height, weight) {

    if (!img) throw new Error('Value Missing');
    if (!name) throw new Error('Value Missing');
    if (!typeOne) throw new Error('Value Missing');
    if (!typeTwo) throw new Error('Value Missing');
    if (!hp) throw new Error('Value Missing');
    if (!attack) throw new Error('Value Missing');
    if (!def) throw new Error('Value Missing');
    if (!speed) throw new Error('Value Missing');
    if (!height) throw new Error('Value Missing');
    if (!weight) throw new Error('Value Missing');

    if (typeof img !== 'string' && img.includes('https://')) throw new Error('Incorrect Value');
    if (typeof name !== 'string') throw new Error('Incorrect Value');
    if (typeof typeOne !== 'string') throw new Error('Incorrect Value');
    if (typeof typeTwo !== 'string') throw new Error('Incorrect Value');
    if (typeof hp !== 'number') throw new Error('Incorrect Value');
    if (typeof attack !== 'number') throw new Error('Incorrect Value');
    if (typeof def !== 'number') throw new Error('Incorrect Value');
    if (typeof speed !== 'number') throw new Error('Incorrect Value');
    if (typeof height !== 'number') throw new Error('Incorrect Value');
    if (typeof weight !== 'number') throw new Error('Incorrect Value');

    // const existe = await Pokemon.findOne({ where: { name: name } })

    if (await Pokemon.findOne({ where: { name: name } })) throw new Error('This pokemon already exists.');

    await Pokemon.create({
        img: img,
        name: name,
        hp: hp,
        attack: attack,
        def: def,
        speed: speed,
        height: height,
        weight: weight,
    });
    if (await Pokemon.findOne({
        where: {
            name: name
        }
    })
    ) return 'Pokemon created Succesfuly.';

    throw new Error('Theres been an error, please try again.');
}

// img nombre tipos
// [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
// [ ] Número de Pokemon (id)
// [ ] Estadísticas (vida, fuerza, defensa, velocidad)
// [ ] Altura y peso


module.exports = { getPoke, getPokeDb, getTypes, getTypesDb, createNewPoke };

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