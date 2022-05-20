const router = require('express').Router();

const {
    getAllPoke,
} = require('../Middlewares/middleware');

const { Pokemon, Types } = require('../db');



router.get('/pokemons', async (req, res) => {
    let name = req.query.name
    let allPokes = await getAllPoke();
    if (name) {
        name = name.toLowerCase();
        const poke = await Pokemon.findOne({
            where: {
                name: name
            },
            include: {
                model: Types,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
        // let pokeName = allPokes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        // pokeName.length ?
        //     res.status(200).send(pokeName)
        //     : res.status(404).send(`The pokemon "${name}" doesn't exist.`);
        if (poke) res.status(200).send(poke);

        else res.send(`The pokemon "${name}" doesn't exist.`);
    } else {
        try {
            res.json(allPokes);
        } catch (err) {
            res.send({ msg: err.message })
        }

    }
})
// router.get('/pokemons', async (req, res) => {
//     let name = req.query.name
//     let allPokes = await getAllPoke();
//     if (name) {
//         name = name.toLowerCase();
//         const poke = await Pokemon.findOne({
//             where: {
//                 name: name
//             },
//             include: {
//                 model: Types,
//                 attributes: ['name'],
//                 through: {
//                     attributes: [],
//                 }
//             }
//         })
//         // let pokeName = allPokes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
//         // pokeName.length ?
//         //     res.status(200).send(pokeName)
//         //     : res.status(404).send(`The pokemon "${name}" doesn't exist.`);
//         if (poke) res.status(200).send(poke);

//         else res.send(`The pokemon "${name}" doesn't exist.`);
//     } else {
//         try {
//             res.json(allPokes);
//         } catch (err) {
//             res.send({ msg: err.message })
//         }

//     }
// })

router.post('/create', async (req, res) => {
    const {
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        img
    } = req.body;
    if (
        !name ||
        !hp ||
        !attack ||
        !defense ||
        !speed ||
        !height ||
        !weight
    ) { return res.status(400).json({ info: `Theres a missing value` }) }
    let arrType = []
    req.body.types.map(e => arrType.push({ name: e })) //por la forma en la que mando la informacion desde el front, se me hizo
    //necesario parsear la información desde el back para que la reconozca.
    if (!arrType.length) { return res.status(400).json({ info: `Choose at least one type` }) }

    const exists = await Pokemon.findOne({ where: { name: req.body.name } })

    if (exists) return res.json({ info: "This pokemons already exists!" });
    try {
        const newPoke = await Pokemon.create({
            name: req.body.name,
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            speed: req.body.speed,
            height: req.body.height,
            weight: req.body.weight,
            createdDb: true,
            img: img ? img : "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif"
        });
        let typeDb = await Types.findAll({ where: { name: arrType[0].name } })
        newPoke.addType(typeDb);
        if (arrType[1]) {
            let typeDb2 = await Types.findAll({ where: { name: arrType[1].name } })
            newPoke.addType(typeDb2);
        }

        res.status(201).send({ msg: 'Pokemon created successfully!' })
    } catch (err) {
        console.log(err);
    }


});

router.put('/modify/:id', async (req, res) => {
    let { id } = req.params;
    var pokemon = await Pokemon.findOne({ where: { id: id } });
    console.log(pokemon)

})

router.get('/pokemons/:id', async (req, res) => {
    let { id } = req.params;

    let poke = await getAllPoke();
    // console.log(id.length)
    // if (id.length > 10) {
    let findPokeId = poke.find(e => e.id == id) // EL QUERY MANDA UN STRING Y EL ID ES UN ENTERO
    findPokeId ?
        res.status(200).json(findPokeId) :
        res.status(404).send({ msg: `The pokemon ID: ${id} doesn't exist.` });
    // } else {
    //     let findPokeId = poke.find(e => e.idPoke == id)
    //     findPokeId ?
    //         res.status(200).json(findPokeId) :
    //         res.status(404).send({ msg: `The pokemon ID: ${id} doesn't exist.` });
    // }
})





// router.delete('/delete/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const toDelete = await deletePokemon(id);
//         if (toDelete) {
//             await Pokemon.destroy({ where: { idPoke: id } })
//             const update = await Pokemon.findAll();
//             res.json(update);
//         }
//     } catch (err) {
//         res.status(404).json({ msg: err.message })
//     }
// })


module.exports = router;

