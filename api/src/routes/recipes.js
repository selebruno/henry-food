const { Router } = require('express');
const router = Router();
const { Recipe,Types } = require("../db");

router.get('/',(req,res)=>{
    Recipe.findAll().then((recipes) => res.send(recipes))
})

router.get('/?name="..."', async (req,res) =>{
    const recipes = Recipe.findAll({ limit: 9 },{
    where: {
        'name': req.query.name
    }
    }) 
    if (!recipes) return res.sendStatus(404).send('No se encontraron recetas adecuadas');
    res.json(recipes)
     })

     router.get('/{idReceta}', async (req,res) =>{
        //  res.send(hola)
        const { idReceta } = req.query.id
        const recipe = await Recipe.findByPk(idReceta, {
        include: Types
         });
        if(!recipe) return res.sendStatus(404);
        res.json(recipe);
    });


    

  
    
module.exports = router;