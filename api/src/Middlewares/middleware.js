const { Pokemon, Types } = require('../db')
const axios = require('axios');
const { Op } = require('sequelize');

const getPoke = async () => {
    const pokemons = await axios('https://pokeapi.co/api/v2/pokemon?offset=0&limit=3');
    const mapUrl = await pokemons.data.results.map(e => { return e.url })
    var arrayPokemones = [];
    for (var i = 0; i < mapUrl.length; i++) {
        const url = await axios(mapUrl[i])
        arrayPokemones.push({
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
    return arrayPokemones;
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
            name: getting.data.results[i].name,
        })
    }
    return arrTypes;
}

const getTypesDb = async function () {
    return await Types.findAll();
}

const createNewPoke = async function (img, name, hp, attack, def, speed, height, weight, typeOne, typeTwo) {
    if (!typeOne) throw new Error('type Value Missing');
    if (!img) throw new Error('imgValue Missing');
    if (!name) throw new Error('nameValue Missing');
    if (!hp) throw new Error('hpValue Missing');
    if (!attack) throw new Error('attackValue Missing');
    if (!def) throw new Error('defValue Missing');
    if (!speed) throw new Error('speedValue Missing');
    if (!height) throw new Error('height Missing');
    if (!weight) throw new Error('weight Value Missing');

    if (typeof name !== 'string') throw new Error('The name must be a string Incorrect');
    if (typeof img !== 'string' && img.includes('https://')) throw new Error('The image path is Incorrect ');
    if (typeof typeOne !== 'string') throw new Error('First Type value is Incorrect '); //type two deja de ser checkeado
    if (typeof hp !== 'number') throw new Error('Health Value is Incorrect ');
    if (typeof attack !== 'number') throw new Error('Attack is Incorrect ');
    if (typeof def !== 'number') throw new Error('Defense is Incorrect ');
    if (typeof speed !== 'number') throw new Error('Speed is Incorrect ');
    if (typeof height !== 'number') throw new Error('Height is Incorrect ');
    if (typeof weight !== 'number') throw new Error('Weight is Incorrect ');

    const resultado = await Pokemon.create({
        img: img,
        name: name,
        hp: hp,
        attack: attack,
        def: def,
        speed: speed,
        height: height,
        weight: weight,
        typeOne: typeOne,
        typeTwo: typeTwo ? typeTwo : null,
        createdDb: true
    });
    const relation = await Types.findOne({
        where: {
            name: typeOne
        }
    })
    const relation2 = await Types.findOne({
        where: {
            name: typeTwo
        }
    })


    await resultado.addType(relation);
    await resultado.addType(relation2);


    return 'Pokemon created Succesfuly.';
}

const displayPokemonsCards = async function (offset, numberOfCards) {
    const card = await Pokemon.findAll({
        attributes: {
            exclude: [
                "id",
                "idPoke",
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
            idPoke: id
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


const deletePokemon = async function (id) {
    const deleting = await Pokemon.findOne({ where: { createdDb: true, idPoke: id } })
    return deleting;
}

// const typeFilterOne=()=>{

// }




module.exports = { deletePokemon, getPoke, getPokeDb, getTypes, getTypesDb, createNewPoke, displayPokemonsCards, displayDetail, displayByName };

