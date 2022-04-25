const router = require('express').Router();
const { getPoke, getPokeDb, createNewPoke } = require('../Middlewares/middleware');
const { Pokemon } = require('../db');

router.get('/pokemons', async (req, res, next) => {
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

router.post('/pokemons', async (req, res, next) => {
    try {
        const { img, name, typeOne, typeTwo, hp, attack, def, speed, height, weight } = req.body;
        const newPoke = await createNewPoke(img, name, typeOne, typeTwo, hp, attack, def, speed, height, weight);
        res.status(201).json({ msg: newPoke });
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
})



module.exports = router;