const { Router, query } = require('express');
const { Sequelize } = require('sequelize');
const router = Router();
const { Recipe,Types } = require("../db");
const axios = require ('axios')
require('dotenv').config();
const {API_KEY} = process.env;

// HOY 11/5 TODO FUNCIONABA. LO UNICO QUE CAMBIE FUE EL NOMBRE DE LA FUNCION  INFOAPI SI SE ROMPE ES POR ESO.
 
const infoApi = async () => {
    const allApiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY}&number=1000`); 
        //Busco la data y la devuelvo con las props que me interesan {}
        const infoNeeded= await allApiInfo.data.results.map((recipe) => {           
            return {
                name: recipe.title,
                type: recipe.diets.map((diet)=>{return {name:diet}}),
                healthLevel: recipe.healthScore,
                summary: recipe.summary,
                image: recipe.image,
                id: recipe.id,
                score: parseInt(recipe.spoonacularScore), //porque la api me lo devuelve como string
                steps: recipe.analyzedInstructions
            };
        });

        return infoNeeded;

};

 //router.get('/',(req,res,next)=>{                RUTAS PARA OBTENER TODO CON PROMESAS
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
            //BUSCA EN DB
            const results={};
            let query = req.query.name.toLowerCase();
            const queryName = query[0].toUpperCase() + query.slice(1);//primera letra en mayuscula para buscar con todas las dietas

            const filtroBd = await Recipe.findAll({
                where:{
                    name: {
                        [Sequelize.Op.iLike]: `%${queryName}%`//aca va ILIKE y no LIKE porque no me matchea el queryname que esta seteado en mayuscula
                    }, 
                    
                },
                include: {
                    model: Types,
                },
                limit:9

            });
            //CREA LA PROP RESULTS SI ENCONTRO ALGO
            if(filtroBd[0]){results['results']=filtroBd};        
            
            //PARA FILTRAR LA DATA DEL AXIOS
            const datas = await infoApi();
            // console.log(datas)

            const filtroApi= await datas.filter((dato) => dato.name.includes(queryName));
            //SI SE ENCONTRO POR QUERY
            if(filtroApi.length){
                //ENCONTRO AXIOS PERO NO DE DB
                if(!results.results){
                    results['results']=filtroApi;
                    res.send(results);
                }else{//AXIOS Y DB
                    results.results=results.results.concat(filtroApi);
                    res.send(results);
                };

            }else{
                //NO HAY DE AXIOS NI DE DB
                if(!results.results){
                    res.status(404).json({results:[{error:'No recipes found for this search.'}]})
                }else{//NO HAY DE AXIOS PERO SI DE DB
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
        } 
         })
        }else{
        const idApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        const datosApi = idApi.data;
           infoPorId ={
            title: datosApi.title,
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