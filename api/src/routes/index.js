const router = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const api_url = "https://employeedetails.free.beeceptor.com/my/api/path";

const pokeTypes = require('./Types');
const pokeRoutes = require('./Pokemons');

router.use('/', pokeRoutes);
router.use('/', pokeTypes);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
