const router = require('express').Router();
const { Pokemon, Types } = require('../db');

//********************************************************************************************************************************************//
//*********************************************************************************************************************************//
//********************************************************************************************************************************************//
// type: 'false',
//   attackUp: 'false',
//   attackDown: 'false',
//   nameUp: 'false',
//   nameDown: 'false'
router.get('/', async (req, res) => {
    console.log(req.query)
    let { name, typeFilter, order, created, api } = req.query
    try {

        if (created) {
            console.log("created: ")
            const createdInDb = await Pokemon.findAll({ where: { createdDb: true } });
            if (!createdInDb.length) {
                return res.send({ msg: "You haven't created any new pokemon yet" })
            }
            return res.send(createdInDb);
        }
        if (api) {
            console.log("api: ",)
            const createdFromApi = await Pokemon.findAll({ where: { createdDb: false } });
            return res.send(createdFromApi);
        }

        if (name) {  //find by name
            console.log("name: ")
            name = name.toLowerCase();
            const poke = await Pokemon.findOne({
                where: { name: name },
                include: {
                    model: Types,
                    attributes: ['name'],
                    through: { attributes: [], }
                }
            })
            if (poke) return res.status(200).send(poke);
            else return res.status(404).send(`The pokemon "${name}" doesn't exist.`);
        }

        if (typeFilter !== "default" && typeFilter) { //Filtro de tipo -- Cierta duplicacion de esfuerzos ya que el filtro de tipos usa una variable distinta
            console.log("type: ", typeFilter)
            var filterType = await Pokemon.findAll({
                include: {  //incluye el modelo Types
                    model: Types,
                    where: { 'name': typeFilter }, // dentrro de la inclución filtro los que tienen el nombre que busco
                    attributes: ['name'],
                    through: { attributes: [] }
                },
            })

            if (filterType.length) { // Checkeo si encontró algo

                // let filterArray = [];
                // for (var i = 0; i < filterType.length; i++) { //busco una por una todas la coincidencias 
                //     let found = await Pokemon.findOne({  //el .map está sobrevalorado
                //         where: { id: filterType[i].id },
                //         include: {
                //             model: Types,
                //             attributes: ['name'],
                //             through: { attributes: [] }
                //         }
                //     })
                //     filterArray.push(found);
                // }
                //Orden por ataque
                // if (attackFilter === 'attackUp') filterArray = filterArray.sort((a, b) => b.attack - a.attack)
                // //Orden descendente
                // if (attackFilter === 'attackDown') filterArray = filterArray.sort((a, b) => a.attack - b.attack)
                // // Alfabetico
                // if (nameFilter === 'nameUp') filterArray = filterArray.sort((a, b) => b.name.localeCompare(a.name))
                // // Alfabetico descendente
                // if (nameFilter === 'nameDown') filterArray = filterArray.sort((a, b) => a.name.localeCompare(b.name))


                //Orden por ataque
                if (order === 'attackUp') filterType = filterType.sort((a, b) => b.attack - a.attack)
                //Orden descendente
                if (order === 'attackDown') filterType = filterType.sort((a, b) => a.attack - b.attack)
                // Alfabetico
                if (order === 'nameUp') filterType = filterType.sort((a, b) => b.name.localeCompare(a.name))
                // Alfabetico descendente
                if (order === 'nameDown') filterType = filterType.sort((a, b) => a.name.localeCompare(b.name))
                // console.log(filterArray)
                // return res.send(filterArray);
                return res.send(filterType);
            }
            return res.status(404).send({ msg: "This type of pokemon doesn't exist yet" })
        }
        var allPokeNoMods = await Pokemon.findAll({  // Find All No Type Filter
            include: {
                model: Types,
                attributes: ['name'],
                through: { attributes: [], }
            }
        })

        //Orden por ataque
        if (order === 'attackUp') allPokeNoMods = allPokeNoMods.sort((a, b) => b.attack - a.attack);
        //Orden descendente
        if (order === 'attackDown') allPokeNoMods = allPokeNoMods.sort((a, b) => a.attack - b.attack);
        // Orden Alfabetico
        if (order === 'nameUp') allPokeNoMods = allPokeNoMods.sort((a, b) => b.name.localeCompare(a.name));
        // Orden Alfabetico descendente
        if (order === 'nameDown') allPokeNoMods = allPokeNoMods.sort((a, b) => a.name.localeCompare(b.name));
        // console.log(allPokeNoMods[0].types)
        res.send(allPokeNoMods); // return All
    } catch (err) {
        console.log("here be error", err.message);
        res.send({ msg: err.message });
    }

})

//********************************************************************************************************************************************//
//*********************************************************************************************************************************//
//********************************************************************************************************************************************//

router.post('/create', async (req, res) => {
    const {
        name, hp, attack, defense, speed, height, weight, img
    } = req.body;
    if (!name || !hp || !attack || !defense || !speed || !height || !weight) {
        return res.status(400).json({
            info: `Theres a missing value`
        })
    }
    let arrType = []
    req.body.types.map(e => arrType.push({ name: e }))
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

//********************************************************************************************************************************************//
//*********************************************************************************************************************************//
//********************************************************************************************************************************************//

router.put('/modify/:id', async (req, res) => {
    let { id } = req.params;
    let { name, hp, attack, defense, speed, height, weight, img } = req.body;
    console.log(name, hp, attack, defense, speed, height, weight, img)
    try {
        let find = await Pokemon.findOne({ where: { id: id } })
        if (find) {

            await Pokemon.update({
                name: name ? name : find.name,
                hp: hp ? hp : find.hp,
                attack: attack ? attack : find.attack,
                defense: defense ? defense : find.defense,
                speed: speed ? speed : find.speed,
                height: height ? height : find.height,
                weight: weight ? weight : find.weight,
                img: img ? img : find.img
            }, { where: { id: id } })

            return res.send({ msg: "Updated successfully" });
        }
        res.send({ msg: "This Pokemon doen't exist" });

    } catch (err) {
        console.log("This be the message", err.message)
        res.send({ msg: err.message })
    }
});

//********************************************************************************************************************************************//
//*********************************************************************************************************************************//
//********************************************************************************************************************************************//

router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const findIt = await Pokemon.findOne({
            where: { id: id },
            include: {
                model: Types,
                attributes: ['name'],
                through: { attributes: [], }
            }
        });
        res.send(findIt);
    } catch (err) {
        console.log(err.message);
        res.send({ msg: err.msg });
    }
});

//********************************************************************************************************************************************//
//*********************************************************************************************************************************//
//********************************************************************************************************************************************//

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const toDelete = await Pokemon.findOne({ where: { id: id } })
        if (toDelete) {
            await Pokemon.destroy({ where: { id: id } })
            return res.send({ msg: "Pokemon Deleted successfully" });
        }
        res.send({ msg: `The Pokemon id  ${id}  doen't exist ` });
    } catch (err) {
        console.log({ msg: err.message })
        res.send({ msg: err.message })
    }
});


module.exports = router;

