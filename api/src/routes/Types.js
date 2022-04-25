const router = require('express').Router();
const { getTypes, getTypesDb } = require('../Middlewares/middleware');
const { Types } = require('../db');

router.get('/types', async (req, res, next) => {
    try {
        const listTypes = await getTypes();
        const cont = await Types.count()
        let infoHold;
        if (cont === 0) infoHold = await Types.bulkCreate(listTypes);
        infoHold = await getTypesDb();
        res.send(infoHold)

    } catch (err) {
        next(err);
    }
})

module.exports = router;