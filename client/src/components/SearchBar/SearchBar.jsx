 import React, {useState,useEffect} from 'react';
 import {connect} from 'react-redux';
 import {Link} from 'react-router-dom';
 import {getRecipesByName,orderByName,orderByScore, getTypes,showLoader,hideLoader,resetAll,getRecipeById} from '../../actions'
 import PageLoader from './PageLoader'
 import Paged from '../Paged/Paged'
 import s from './searchBar.module.css'
 import {motion} from 'framer-motion'
 import Filter from '../Filters/Filters'
 import henry from '../../HenryFood.jpeg'






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
    }else{
        alert('You must enter a valid word')
    }
    setInput({
        name:''
    })
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

 

function handleOrder (e){
    e.preventDefault();
    e.target.value === 'asc' || e.target.value==='desc'?
    props.orderByName(e.target.value):
    props.orderByScore(e.target.value) 
    setCurrentPage(1);
    setRender(`Ordered ${e.target.value}`)
  };

  let allRecipes;

  props.filterBy === "All" 
    ? (allRecipes = props.recipes.slice())
    : (allRecipes = props.filteredRecipes.slice());

const [render, setRender]= useState('');  
const [currentPage,setCurrentPage] = useState(1);
const [recipesPerPage,setRecipesPerPage]= useState(9);
const indexOfLastRecipe = currentPage * recipesPerPage; //9
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //0
const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)

 const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    props.getTypes()
    return () => {
    }
  }, [])



return (
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
       <div className= {s.bar}>  
        <form className={s.form} onSubmit={e => handleSubmit(e)}>
            <input className={s.input} type="text"
            className= {s.input}
            placeholder='Search Recipe...'
            value= {input.name}
            onChange={e=> handleChange(e)} />
            <button className={s.btn} type= 'submit' onClick={updateProfile}>Search</button>
        </form>
        <div > 
                <Filter />
                <select className={s.select} onChange={(e) =>handleOrder(e)}>
                <option value= '' disabled selected>Sort by</option>
                <option value='asc'>Alphabet - A-Z</option>
                <option value='desc'>Alphabet - Z-A</option>
                <option value='Highest'>Score - Highest to lowest</option>
                <option value='Lowest'>Score - Lowest to highest</option>
                </select>
        </div>
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
                        <Link to = {`/recipe/${el.id}`} onClick={()=>props.getRecipeById(el.id)}>
                            <figure className={s.figure}>
                       {el.image ? <img className={s.img} title={el.name} src={el.image}></img> : <img className={s.img} src={henry} ></img> }
                        <figcaption className={s.figcaption}>
                            {el.name}
                            <br/>
                            <div>
                            Diets:   
                        {el.types && el.types.map((diet) => <div >{diet.title.charAt(0).toUpperCase()+ diet.title.slice(1)}</div>)}
                            </div>
                            </figcaption>
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
    </motion.div>
)}

function mapStateToProps(state){
    return {
        types: state.types,
        recipes: state.recipesSearch,
        filtered: state.filtered,
        filterBy: state.filterBy,
        filteredRecipes: state.filteredRecipes
    }
}

function mapDispatchToProps(dispatch){
    return{
        getTypes: () => dispatch(getTypes()),
        getRecipesByName: name => dispatch(getRecipesByName(name)),   
        showLoader: () => dispatch(showLoader()),
        hideLoader: () => dispatch(hideLoader()),
        resetAll: () => dispatch(resetAll()),
        orderByName: (string) => dispatch(orderByName(string)),
        orderByScore: (string) => dispatch (orderByScore(string)),
        getRecipeById: (id) => dispatch(getRecipeById(id)),
        

    }
}

export default connect (mapStateToProps,mapDispatchToProps)(SearchBar)