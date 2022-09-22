const { Pokemon, Types } = require('../db');
class PokemonController {

    async findAllPokemon(req, res) {
        try {
            const { name, typeFilter, order, direction } = req.query;
            if (name) { //SEARCH BY NAME
                const findByName = await Pokemon.findOne({ where: { name: name } })
                if (!findByName) {
                    return res.status(404).send({
                        success: false,
                        message: `Name ${name} doesn't exist`
                    })
                }
                return res.send({
                    success: true,
                    data: findByName
                })
            }
            let allPoke;
            if (typeFilter && typeFilter !== 'default') { //IF FILTER BY TYPE
                if (order && order !== 'default') { //IF FILTER BY TYPE AND ORDER
                    const filterTypeOrder = await Pokemon.findAll({
                        order: [[`${order}`, direction]],
                        include: {
                            model: Types,
                            where: { 'name': typeFilter },
                            attributes: ['name'],
                            through: { attributes: [] },
                        }
                    })
                    if (!filterTypeOrder) return res.send({
                        success: false,
                        message: `No pokemon with type ${typeFilter}`
                    });
                    return res.send({
                        success: true,
                        data: filterTypeOrder
                    })
                } //IF  FILTER BY TYPE ONLY
                const filterTypeOnly = await Pokemon.findAll({
                    include: {
                        model: Types,
                        where: { 'name': typeFilter },
                        attributes: ['name'],
                        through: { attributes: [] },
                    }

                })
                if (!filterTypeOnly) return res.send({
                    success: false,
                    message: `No pokemon with type ${typeFilter}`
                });
                return res.send({
                    success: true,
                    data: filterTypeOnly
                })


            }
            if (order && order !== 'default') { //IF ORDER ONLY
                console.log(req.query)
                allPoke = await Pokemon.findAll({
                    order: [[`${order}`, direction]],
                    include: {
                        model: Types,
                        attributes: ['name'],
                        through: { attributes: [] },
                    }
                })
            } else { //IF NO FILTER/ORDER PARAMETERS WERE SENT, IT RETURNS ALL POKEMON IN DATA BASE
                allPoke = await Pokemon.findAll({
                    include: {
                        model: Types,
                        attributes: ['name'],
                        through: { attributes: [] },
                    }
                });
            }
            if (!allPoke?.length) return res.send({
                success: false,
                message: 'No Pokemon have been found'
            });

            res.send({
                success: true,
                data: allPoke
            })
        } catch (err) {
            res.send({
                error: true,
                message: err.message
            })
        }
    }

    async createPokemon(req, res) {
        try {
            const { name, hp, attack, defense, speed, height, weight, image, types } = req.body

            let arrType = []
            if (!types?.length) {
                return res.status(400).json({
                    succes: false,
                    message: `Choose at least one type`
                })
            }

            const exists = await Pokemon.findOne({ where: { name: req.body.name } })

            if (exists) return res.send({
                succes: false,
                message: `The name ${name} already exists`
            })

            types.map((e) => arrType.push({ name: e }))

            const newPoke = await Pokemon.create({
                name: name,
                hp: hp,
                attack: attack,
                defense: defense,
                speed: speed,
                height: height,
                weight: weight,
                createdDb: true,
                img: image
                    ? image
                    : 'https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif',
            })
            let typeDb = await Types.findAll({ where: { name: arrType[0].name } })
            newPoke.addType(typeDb)
            if (arrType[1]) {
                let typeDb2 = await Types.findAll({ where: { name: arrType[1].name } })
                newPoke.addType(typeDb2)
            }

            res.status(201).send({
                succes: true,
                message: 'Pokemon created successfully!'
            })
        } catch (err) {
            res.status(400).send({
                error: true,
                message: err.message
            })
        }
    }

    async deletePokemon(req, res) {
        const { id } = req.params
        try {
            const toDelete = await Pokemon.findOne({ where: { id: id } })
            if (toDelete) {
                await Pokemon.destroy({ where: { id: id } })
                return res.send({
                    success: true,
                    message: 'Pokemon Deleted successfully'
                })
            }
            res.send({
                success: false,
                message: `The Pokemon id  ${id}  doen't exist `
            })
        } catch (err) {
            res.send({
                error: true,
                message: err.message
            })
        }
    }

    async getPokemonById(req, res) {
        try {
            const { id } = req.params
            const findPoke = await Pokemon.findByPk(id, {
                include: {
                    model: Types,
                    attributes: ['name'],
                    through: { attributes: [] },
                }
            });
            if (!findPoke) {
                return res.status(404).send({
                    success: false,
                    message: 'Pokemon not found'
                })
            }

            res.send({
                succes: true,
                data: findPoke
            })

        } catch (error) {
            res.send({
                error: true,
                message: error.message
            })
        }
    }

    async updatePokemon(req, res) {
        let { id } = req.params
        let { name, hp, attack, defense, speed, height, weight, img } = req.body
        console.log(name)
        if (!req.body) {
            return res.send({
                success: false,
                message: 'No information has been received'
            })
        }
        try {
            if (name) {
                const checkName = await Pokemon.findOne({ where: { name: name } });
                if (checkName) return res.send({
                    success: false,
                    message: `The pokemon name ${name} already exists`
                })
            }
            let find = await Pokemon.findOne({ where: { id: id } })
            if (!find) {
                return res.status(404).send({
                    success: false,
                    message: `The pokemon id "${id}", doesn't exist`
                })
            }

            await Pokemon.update(

                {
                    name: name ? name : find.name,
                    hp: hp ? hp : find.hp,
                    attack: attack ? attack : find.attack,
                    defense: defense ? defense : find.defense,
                    speed: speed ? speed : find.speed,
                    height: height ? height : find.height,
                    weight: weight ? weight : find.weight,
                    img: img ? img : find.img,
                },
                { where: { id: id } }
            )

            return res.send({
                success: true,
                message: 'Updated successfully'
            })

        } catch (err) {
            res.send({
                error: true,
                message: err.message
            })
        }
    }

}



module.exports = new PokemonController();