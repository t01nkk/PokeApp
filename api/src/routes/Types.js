const router = require('express').Router();
const { Types } = require('../db');
const { default: axios } = require('axios');

router.get('/types', async (req, res) => {
    // try {
    const api = await axios('https://pokeapi.co/api/v2/type');
    const apiTypes = api.data.results.map(e => e.name)
    for (let i = 0; i < apiTypes.length; i++) {
        Types.findOrCreate({
            where: { name: apiTypes[i] }
        })
    }
    const allTypes = await Types.findAll();
    res.send(allTypes);
    // } catch (err) {
    //     res.status(404).send(err.message);
    // }
})

module.exports = router;