const router = require('express').Router()
const { check, query } = require('express-validator');
const pokemon = require('../controllers/pokemon');
const validateField = require('../Middlewares/validateField')

router.get('/', [
  query('name', '').optional().notEmpty().isString(),
  query('typeFilter', '').optional().notEmpty().isString(),
  query('order', '').optional().notEmpty().isString(),
  query('direction', '').optional().notEmpty().isString(),
  validateField
], pokemon.findAllPokemon);

//
router.post('/', [
  check('name', 'name Must not be empty').not().isEmpty(),
  check('name', 'name Must be a string').isString(),

  check('hp', 'hp must not be empty').not().isEmpty(),
  check('hp', 'hp must be an integer').isInt({ min: 1 }),

  check('attack', 'attack must not be empty').not().isEmpty(),
  check('attack', 'attack must be an integer').isInt({ min: 1 }),

  check('defense', 'defense must not be empty').not().isEmpty(),
  check('defense', 'defense must be an integer').isInt({ min: 1 }),

  check('speed', 'speed must not be empty').not().isEmpty(),
  check('speed', 'speed must be an integer').isInt({ min: 1 }),

  check('height', 'height must not be empty').not().isEmpty(),
  check('height', 'height must be an integer').isInt({ min: 1 }),

  check('weight', 'weight must not be empty').not().isEmpty(),
  check('weight', 'weight must be an integer').isInt({ min: 1 }),

  check('image', 'image must be an integer').isString(),
  validateField
],
  pokemon.createPokemon
);

router.put('/:id', [
  check('name', 'name Must be a string').optional().isString(),

  check('hp', 'hp must be an integer').optional().isInt({ min: 1 }),

  check('attack', 'attack must be an integer').optional().isInt({ min: 1 }),

  check('defense', 'defense must be an integer').optional().isInt({ min: 1 }),

  check('speed', 'speed must be an integer').optional().isInt({ min: 1 }),

  check('height', 'height must be an integer').optional().isInt({ min: 1 }),

  check('weight', 'weight must be an integer').optional().isInt({ min: 1 }),

  check('image', 'image must be an integer').optional().isString(),
  validateField
], pokemon.updatePokemon);

router.get('/:id', pokemon.getPokemonById);

router.delete('/:id', pokemon.deletePokemon);

module.exports = router
