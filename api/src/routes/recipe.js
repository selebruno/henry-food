const { Router } = require('express');
// const { UUIDV4 } = require('sequelize/types');
const router = Router();
const { v4: uuidv4 } = require('uuid');
uuidv4();

const { Recipe } = require ('../db.js')

router.post("/", (req, res) => {
    const receta = req.body;
  
    Recipe.create({
      ...receta,
      id: uuidv4()
    })
      .then(recipe => {
        res.status(200).send(recipe)
      })
      .catch((err) => {
        console.log(err);
      });
  });




module.exports = router;
