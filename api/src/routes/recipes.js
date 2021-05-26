const { Router, query } = require('express');
const { Sequelize } = require('sequelize');
const router = Router();
const { Recipe,Types } = require("../db");
const axios = require ('axios')
require('dotenv').config();
const {API_KEY} = process.env;

// HOY 11/5 TODO FUNCIONABA
 
const infoApi = async () => {
    const allApiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY}&number=1000`); 

        const infoNeeded= await allApiInfo.data.results.map((recipe) => {           
            return {
                name: recipe.title,
                types: recipe.diets.map((diet)=>{return {title:diet}}),
                healthLevel: recipe.healthScore,
                summary: recipe.summary,
                image: recipe.image,
                id: recipe.id,
                score: parseInt(recipe.spoonacularScore),
                steps: recipe.analyzedInstructions
            };
        });

        return infoNeeded;

};

 //router.get('/',(req,res,next)=>{                
  //   const myRecipes = Recipe.findAll()
 //    const recipeApi =  axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY}&number=100`);
 //    Promise.all([myRecipes,recipeApi])
 //   .then((results) => {
 //    const [myRecipesResponse, recipeApiResponse] = results;
 //       const response= myRecipesResponse.concat(recipeApiResponse.data)
  //       res.send(response)
 //    })     
 //    .catch((error)=> next(error));
 //   })


//ruta del get a /?name='...'

 router.get('/',  async (req,res) =>{
    if(req.query){

        try {
            const results={};
            let query = req.query.name.toLowerCase();
            const queryName = query[0].toUpperCase() + query.slice(1);

            const filtroBd = await Recipe.findAll({
                where:{
                    name: {
                        [Sequelize.Op.iLike]: `%${queryName}%`//aca va ILIKE y no LIKE porque no me matchea el queryname que esta seteado en mayuscula
                    }, 
                    
                },
                include: {
                    model: Types,
                    attributes:['title'],
                    through:{
                        attributes: []
                    }
                },

            });
            if(filtroBd[0]){results['results']=filtroBd};        
            
     
            const datas = await infoApi();
           

            const filtroApi= await datas.filter((dato) => dato.name.includes(queryName));
        
            if(filtroApi.length){
               
                if(!results.results){
                    results['results']=filtroApi;
                    res.send(results);
                }else{
                    results.results=results.results.concat(filtroApi);
                    res.send(results);
                };

            }else{
                
                if(!results.results){
                    res.status(404).json({results:[{error:'No recipes found for this search.'}]})
                }else{
                    res.json(results);
                };
            };         
        } catch (error){
            console.error(error);
            res.status(500).json({results:{error:'Server error'}});
        };

    }else{res.status(404)};
});




     //ruta del get a {idReceta}

     router.get('/:idReceta', async (req,res) =>{
        const id= req.params.idReceta
        let infoPorId;
        if (id.length>10){ 
        infoPorId = await Recipe.findByPk(id, {
        include:{
            model:Types,
            attributes:['title'],
            through:{
                attributes:[]
            }
        } 
         })
        }else{
        const idApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        const datosApi = idApi.data;
           infoPorId ={
            name: datosApi.title,
            summary: datosApi.summary,
            score: datosApi.spoonacularScore,
            healthLevel: datosApi.healthScore,
            steps:datosApi.instructions,
            id: datosApi.id,
            types: datosApi.diets,
            image: datosApi.image,
            dishTypes: datosApi.dishTypes,   
        }
        };
        if(infoPorId){
            res.send(infoPorId);
        }else{
            res.status(404).send('No se encontraron recetas')
        }
    })
    


    

  
    
module.exports = router;