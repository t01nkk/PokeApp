const { Pokemon, Types } = require('../db')
const axios = require('axios');
const { Op } = require('sequelize');

const getPoke = async () => {
    const pokemons = await axios('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1');
    const mapUrl = await pokemons.data.results.map(e => { return e.url })
    var arrayPokemones = [];
    for (var i = 0; i < mapUrl.length; i++) {
        const url = await axios(mapUrl[i])
        arrayPokemones.push({
            id: url.data.id,
            name: url.data.name,
            height: url.data.height,
            weight: url.data.weight,
            hp: url.data.stats.find(e => e.stat.name === 'hp').base_stat,
            defense: url.data.stats.find(e => e.stat.name === 'defense').base_stat,
            speed: url.data.stats.find(e => e.stat.name === 'speed').base_stat,
            attack: url.data.stats.find(e => e.stat.name === 'attack').base_stat,
            img: url.data.sprites.other["official-artwork"].front_default,
            // type: [url.data.types[0].type.name, url.data.types[1] ? url.data.types[1].type.name : null]
            // typeTwo: url.data.types[1] ? url.data.types[1].type.name : null,
        }
        );
    }
    return arrayPokemones;
}

const getPokeDb = async function () {
    return await Pokemon.findAll(
        {
            attribute: ["name"],
            include: {
                model: Types,
            },
            raw: true,
            nest: true
        });
}

const getTypes = async () => {
    let getting = await axios('https://pokeapi.co/api/v2/type');
    arrTypes = []
    for (var i = 0; i < getting.data.results.length; i++) {
        arrTypes.push({
            id: getting.data.results[i].id,
            name: getting.data.results[i].name,
            // typeTwo: getting.data.results[i].name
        })
    }
    return arrTypes;
}

const getTypesDb = async function () {
    return await Types.findAll({
        include: {
            model: Pokemon,
        },
        raw: true,
        nest: true
    });
}

const createNewPoke = async function (img, name, typeOne, typeTwo, hp, attack, def, speed, height, weight) {

    if (!img) throw new Error('Value Missing');
    if (!name) throw new Error('Value Missing');
    // if (!typeOne) throw new Error('Value Missing');
    // if (!typeTwo) throw new Error('Value Missing');
    if (!hp) throw new Error('Value Missing');
    if (!attack) throw new Error('Value Missing');
    if (!def) throw new Error('Value Missing');
    if (!speed) throw new Error('Value Missing');
    if (!height) throw new Error('Value Missing');
    if (!weight) throw new Error('Value Missing');

    if (typeof name !== 'string') throw new Error('Incorrect Value');
    if (typeof img !== 'string' && img.includes('https://')) throw new Error('Incorrect Value');
    // if (typeof typeOne !== 'string') throw new Error('Incorrect Value');
    // if (typeof typeTwo !== 'string') throw new Error('Incorrect Value');
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

const displayPokemonsCards = async function (offset, numberOfCards) {
    const card = await Pokemon.findAll({
        attributes: {
            exclude: [
                "id",
                "hp",
                "attack",
                "defense",
                "speed",
                "height",
                "weight"
            ]

        }
    });
    return card
}

const displayDetail = async function (id) {
    // if (!id) throw new Error('id no ingresado');
    const poke = await Pokemon.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: [
                "id"
            ]
        }, include: {
            model: Types,
            attribute: ['name', 'id'],
            through: {
                attribute: []
            }
        }
    },
    );
    return poke
}

const displayByName = async function (name) {
    // if (!id) throw new Error('id no ingresado');
    name = name.toLowerCase();
    if (!name) throw new Error('Ingrese un valor');
    let variable = await Pokemon.findOne({
        where: {
            name: { [Op.iLike]: `%${name}%` },
        }, include: {
            model: Types,
            attribute: ['name', 'id'],
            through: {
                attribute: []
            }
        }
    })
    return variable;
}

// const typeFilterOne=()=>{

// }




module.exports = { getPoke, getPokeDb, getTypes, getTypesDb, createNewPoke, displayPokemonsCards, displayDetail, displayByName };

