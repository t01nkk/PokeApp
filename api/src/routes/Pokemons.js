const router = require('express').Router();

const {
    getPoke,
    getPokeDb,
    createNewPoke,
    deletePokemon,
    displayPokemonsCards,
    displayDetail,
    displayByName
} = require('../Middlewares/middleware');

const { Pokemon } = require('../db');
const { Op } = require('sequelize');


router.get('/pokemon', async (req, res, next) => {
    try {
        const cont = await Pokemon.count();
        const listapoke = await getPoke();
        let infoHold;
        if (cont === 0) { infoHold = await Pokemon.bulkCreate(listapoke); }
        infoHold = await getPokeDb();
        res.send(infoHold);
    } catch (err) {
        next({ msg: err.message });
    }

})

// router.get('/pokemon', async (req, res, next) => {
//     if (req.query.name) {
//         try {
//             let { name } = req.query;
//             let poke = await displayByName(name);
//             res.send(poke);
//         } catch (err) {
//             res.status(404).send({ msg: err.message });
//         }

//     }
// })
// router.get('/pokemons', async (req, res) => {
//     if (req.query.name) {
//         try {
//             let { name } = req.query;
//             let poke = await displayByName(name);
//             res.send(poke);
//         } catch (err) {
//             res.status(404).send({ msg: err.message });
//         }
//     } else {
//         try {
//             const card = await displayPokemonsCards();
//             res.send(card);
//         } catch (err) {
//             res.status(404).send({ msg: err.message });
//         }
//     }
// })
// router.get('/', async (req, res, next) => {
//     try {
//         const listapoke = await getPoke();
//         const cont = await Pokemon.count();
//         let infoHold;
//         if (cont === 0) infoHold = await Pokemon.bulkCreate(listapoke);
//         infoHold = await getPokeDb();
//         res.send(infoHold);
//     } catch (err) {
//         next({ msg: err.message });
//     }

// })

// router.get('/pokemons', async (req, res) => {
//     if (req.query.name) {
//         try {
//             let { name } = req.query;
//             let poke = await displayByName(name);
//             res.send(poke);
//         } catch (err) {
//             res.status(404).send({ msg: err.message });
//         }
//     } else {
//         try {
//             const card = await displayPokemonsCards();
//             res.send(card);
//         } catch (err) {
//             res.status(404).send({ msg: err.message });
//         }
//     }
// })

router.get('/pokemons/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let poke = await (displayDetail(id));
        res.send(poke);
    } catch (err) {
        res.status(404).send({ msg: err.message });
    }
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const toDelete = await deletePokemon(id);
        if (toDelete) {
            await Pokemon.destroy({ where: { idPoke: id } })
            const update = await Pokemon.findAll();
            res.json(update);
        }
    } catch (err) {
        res.status(404).json({ msg: err.message })
    }
})

router.post('/create', async (req, res) => {
    try {
        const { img, name, hp, attack, def, speed, height, weight, typeOne, typeTwo } = req.body;
        const newPoke = await createNewPoke(img, name, hp, attack, def, speed, height, weight, typeOne, typeTwo);
        res.status(201).json({ msg: newPoke });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})





module.exports = router;