const { Router } = require('express');
const router = Router();
const { Types } = require("../db");
const { v4: uuidv4 } = require('uuid');
uuidv4();


router.get('/',(req,res)=>{                             //Ruta get me trae todos los tipos de dieta
    Types.findAll().then((types) => res.send(types))
})
   


router.post("/", (req, res) => {             //Este POST lo hice para agregar los tipos de dietas a la base de datos
        const title = req.body.title
      
        Types.create({
          title,
          id: uuidv4()
        })
          .then(type => {
            res.status(200).send(type)
          })
          .catch((err) => {
            console.log(err);
          });
      });


module.exports = router;