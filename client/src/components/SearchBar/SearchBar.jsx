 import React, {useState} from 'react';
 import {connect} from 'react-redux';
 import {Link} from 'react-router-dom';
 import {getRecipesByName,getTypes,showLoader,hideLoader,resetAll} from '../../actions'
 import PageLoader from './PageLoader'
 import Paged from '../Paged/Paged'
 import s from './searchBar.module.css'




export  function SearchBar(props){
    const [input,setInput] = useState({
        name : ''
    })
   


function handleChange(e){
    setInput({
        name: e.target.value
    })
}

function handleSubmit(e){
    e.preventDefault()

    if(input.name){
        props.getRecipesByName(input.name)
        props.getTypes()
        setInput(' ');
    }else{
        alert('You must enter a valid word')
    }
}

function updateProfile(){
   props.showLoader() 
   setTimeout(()=>{
       props.hideLoader()
   },2000)
}

function handleReset(){
    props.resetAll()
} 

const [currentPage,setCurrentPage] = useState(1);
const [recipesPerPage,setRecipesPerPage]= useState(6);
const indexOfLastRecipe = currentPage * recipesPerPage; //9
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //0
const currentRecipes = props.recipes && props.recipes.slice(indexOfFirstRecipe,indexOfLastRecipe)
const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

return (
    <div className= {s.bar}>
        <form className={s.form} onSubmit={e => handleSubmit(e)}>
            <input className={s.input} type="text"
            className= {s.input}
            placeholder='Search Recipe...'
            value= {input.name}
            onChange={e=> handleChange(e)} />
            <button className={s.btn} type= 'submit' onClick={updateProfile}>Search</button>
        </form>
        <span className={s.links}>
            <Link to= {'/post'} className={s.create}>Create Recipe</Link>
            <Link to= {'/'} className={s.land} onClick={e =>handleReset(e)}>Start over</Link>
        </span>
        <div>
        <ul className={s.recetas}>
            {
                currentRecipes && currentRecipes.map(el =>(
                    el.error? 
                    <div className={s.error}> 
                     <h2 className={s.title}>No recipes found</h2>
                     <img src = 'https://steamuserimages-a.akamaihd.net/ugc/883126835007225134/A09EFBB54E7A2724FC7D058955B4EB27C11B7CFD/'></img>
                    </div> :
                    <div className={s.recipeList}>
                        <Link to = {`/recipe/${el.id}`}>
                            <figure className={s.figure}>
                        <img className={s.img} title={el.name} src={el.image}></img>
                        <figcaption className={s.figcaption}>{el.name}</figcaption>
                        </figure>   
                        </Link>
                         </div>
                ))
            }
        </ul>

    </div>
    <PageLoader/>
    <div>
    <Paged
      recipesPerPage={recipesPerPage}
      totalRecipes={props.recipes.length} 
      paged={paged}
      />
    </div>
    </div>
)}

function mapStateToProps(state){
    return {
        recipes: state.recipesSearch
    }
}

function mapDispatchToProps(dispatch){
    return{
        getTypes: () => dispatch(getTypes()),
        getRecipesByName: name => dispatch(getRecipesByName(name)),   
        showLoader: () => dispatch(showLoader()),
        hideLoader: () => dispatch(hideLoader()),
        resetAll: () => dispatch(resetAll())

    }
}

export default connect (mapStateToProps,mapDispatchToProps)(SearchBar)