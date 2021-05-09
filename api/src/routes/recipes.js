const { Router } = require('express');
const { Sequelize } = require('sequelize');
const router = Router();
const { Recipe,Types } = require("../db");

router.get('/',(req,res)=>{
    Recipe.findAll().then((recipes) => res.send(recipes))     //RUTA PARA OBTENER TODAS LAS RECETAS
})


//ruta del get a /?name='...'

// router.get('/',  async (req,res) =>{
// const nameQuery = req.query.name;
// if (nameQuery) {
//     let recetasName = await Recipe.findAll({limit:9},{
//         where:{
//             name = nameQuery
//         }
//     })
//     recetasName.length ? res.send(recetasName) : res.status(404).send('No se encontraron coincidencias')
// }

// })

    router.get('/',  async (req,res,next) =>{
    const queryName = req.query.name.toLowerCase();
    if(queryName){ 
    Recipe.findAll({ limit: 9 },{
    where: {
        name: {
            [Op.eq]:queryName,
         include: Types
        }
    }
    }) 
    .then(recetas => res.json(recetas))
    .catch (error=> next(error)) 
     }
     })


     //ruta del get a {idReceta}

     router.get('/:idReceta',  (req,res) =>{
        const id= req.params.idReceta
        Recipe.findByPk(id, {
        include: Types
         })
         .then(recipe => res.json(recipe))
         .catch( () => res.status(404).send('No se encontraron coincidencias'))
    });


    

  
    
module.exports = router;