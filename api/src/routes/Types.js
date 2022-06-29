const router = require('express').Router();
const { Types } = require('../db');

router.get('/', async (req, res) => {
    try {
        const types = await Types.findAll();
        res.send(types);
    } catch (err) {
        console.log(err.message);
        res.send({ msg: err.message });
    }
})

router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        let exists = await Types.findOne({ where: { name: name } });
        if (!exists) {
            await Types.create({
                name: name
            });
            return res.send({ msg: "You just created a new Type of pokemon!" })
        }
        res.send({ msg: "This type of pokemon already exists" });
    } catch (err) {
        console.log('here be the error', err.message);
        res.send({ msg: err.message });
    }
})


module.exports = router;