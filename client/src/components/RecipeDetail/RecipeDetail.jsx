import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getRecipeById,resetAll} from '../../actions/index'
import s from './recipeDetail.module.css'
import {motion} from 'framer-motion'

function RecipeDetail(props){

    // function handleReset(){
    //     props.resetAll()
    // } 
    
    return(
        <motion.div
        initial='hidden'
        animate='visible'
        variants={{
        hidden: {
            scale: .8,
            opacity: -1
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition:{
                delay: .002
            }
        }
        }}
        >
        <div className={s.container}>
            <Link to= '/home' className={s.goBack}> Go Back 
            </Link>
        <h1 className={s.title}>{props.recipe.name}</h1>
        <div className={s.info}>
        {props.recipe.image? <img  className={s.img} src={props.recipe.image}></img>:
        <img src='https://i0.wp.com/www.eatthis.com/wp-content/uploads/2020/04/woman-cooking-healthy-food-in-kitchen.jpg?fit=1200%2C879&ssl=1'></img>}
        <div  className={s.scores}>
        <h4>Score:{props.recipe.score}</h4>
        <h4>Health Level:{props.recipe.healthLevel}</h4>
        </div>
        <div  className={s.steps}>
            <h4>Summary:</h4>
        <div dangerouslySetInnerHTML={{__html: props.recipe.summary}}></div>
        <h4>Instructions:</h4>
        <div dangerouslySetInnerHTML={{__html: props.recipe.steps}}></div>
        </div>
        <div  className={s.diets}>
        Diets: {props.recipe.types && props.recipe.types.map((type) =>(
        type.title?<div>{type.title}</div>
        :<div>{type}</div>))}
        </div>
        </div>
        </div>
        </motion.div>
    )
}

function mapStateToProps(state){
return{
    recipe: state.recipeById
}
}

function mapDispatchToProps(dispatch){
return{
    getRecipeById: id => dispatch (getRecipeById(id)),
    resetAll: () => dispatch (resetAll())
}
}


export default connect(mapStateToProps,mapDispatchToProps)(RecipeDetail);