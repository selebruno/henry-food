const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RecipesRoute = require ('./recipes');
const RecipeRoute = require ('./recipe');
const TypesRoute = require ('./types')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes',RecipesRoute);
router.use('/recipe',RecipeRoute);
router.use('/types',TypesRoute);




module.exports = router;
