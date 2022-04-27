const router = require('express').Router();
const { getPoke, getPokeDb, createNewPoke, displayPokemonsCards, displayDetail, displayByName } = require('../Middlewares/middleware');
const { Pokemon } = require('../db');
const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
    try {
        const listapoke = await getPoke();
        const cont = await Pokemon.count();
        let infoHold;
        if (cont === 0) infoHold = await Pokemon.bulkCreate(listapoke);
        infoHold = await getPokeDb();
        res.send(infoHold);
    } catch (err) {
        next({ msg: err.message });
    }
})

router.get('/pokemons', async (req, res) => {
    if (req.query.name) {
        try {
            let { name } = req.query;
            let poke = await displayByName(name);
            res.send(poke);
        } catch (err) {
            res.status(404).send({ msg: err.message });
        }
    } else {
        try {
            const card = await displayPokemonsCards();
            res.send(card);
        } catch (err) {
            res.status(404).send({ msg: err.message });
        }
    }
})

router.get('/pokemons/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let poke = await (displayDetail(id));
        res.send(poke);
    } catch (err) {
        res.status(404).send({ msg: err.message });
    }
})



//CREATE
router.post('/create', async (req, res) => {
    try {
        const { img, name, typeOne, typeTwo, hp, attack, def, speed, height, weight } = req.body;
        const newPoke = await createNewPoke(img, name, typeOne, typeTwo, hp, attack, def, speed, height, weight);
        res.status(201).json({ msg: newPoke });
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
})

router.get('')



module.exports = router;