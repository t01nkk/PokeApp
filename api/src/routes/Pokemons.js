const router = require('express').Router();
const { getPoke, getInfodb } = require('./models');
const { Pokemon } = require('../db');

router.get('/pokemons', async (req, res, next) => {
    try {
        const listapoke = await getPoke();
        const cont = await Pokemon.count();
        let infoHold;
        if (cont === 0) infoHold = await Pokemon.bulkCreate(listapoke);
        infoHold = await getInfodb();
        res.send(infoHold);
    } catch (err) {
        next(err);
    }
})

module.exports = router;