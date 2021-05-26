const { Router } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid');
uuidv4();
const { Recipe,Types } = require ('../db.js')
const { Sequelize }= require('sequelize');


router.post("/", async (req, res) => {            //POST PARA CREAR NUEVAS RECETAS
    let {
        name,
        score,
        summary,
        steps,
        healthLevel,
        types,
    } = req.body;
    
      let recipeCreated = await Recipe.create({
        name,
        score,
        summary,
        steps,
        healthLevel,
        id: uuidv4()
      })
      if (!Array.isArray(types)) {
        types = [types];
    };
    
      
    const typesDb = await Types.findAll({
      where: {
        title: {
          [Sequelize.Op.in]: types
        },
      },
  });
  
 
  await recipeCreated.setTypes(typesDb);
  res.status(200).json(recipeCreated);
})

    
  
  //   Recipe.create({
  //     ...receta,
  //     id: uuidv4()
  //   })
  //     .then(recipe => {
  //       res.status(200).send(recipe)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });




module.exports = router;
