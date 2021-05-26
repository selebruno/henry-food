import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getTypes,postRecipe,resetAll} from '../../actions/index'
import s from './recipeCreate.module.css'
import {motion} from 'framer-motion';



export function validate(input){   
    if (input.score>100  || input.score<0){
        alert('Please insert a valid score');
    }
    if(!input.healthLevel>100 ||input.healthLevel<0){
       alert('Please insert a valid Health level')
    }
    if (input.summary.length > 255) alert ('Summary is too long')
};


export function RecipeCreate(props){
    const [input,setInput] = useState({
        name:" ",
        score: 0,
        healthLevel: 0,
        summary:" ",
        steps:" ",
        types:[]

    })

    const [errors,setErrors] = useState({});
    const [render,setRender] = useState('');


function handleChange (e){
    setErrors(validate({
        ...input,
        [e.target.name]:e.target.value
    }));
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
    }

    function handleCheck (e){
        if(e.target.checked){
          setInput({...input, types: [...input.types,e.target.value]});
        }else{
          setInput({...input, types: input.types.filter((diet)=>diet!==e.target.value)})
        };
      };
    
      function handleSubmit (e){
        e.preventDefault();
        props.postRecipe(input)
        setRender('Your recipe was created')
        setInput({
          name: ' ',
          summary: ' ',
          score:0,
          healthLevel:0,
          steps: ' ',
          types: [],
        })
      }

      function handleReset(){
        props.resetAll()
    } 
    
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
          <div className={s.container}>
             <Link to='/home'> <button className={s.goBack} onClick={e => handleReset(e)}>Go Back </button> </Link>
            <h1 className={s.title}>Post your own Recipe!</h1>
          <form className={s.form} 
           onSubmit={(e)=>handleSubmit(e)}>
          <div className={s.alignUno}>
            <label className={s.titulo}>Title:</label>
            <input 
            className={s.inputUno} 
            type="text" 
            autocomplete='off' 
            name="name" 
            onChange={handleChange} 
            value={input.name}/>
          </div>
          <div className={s.alignDos}>
            <label className={s.summary}>Summary:</label>
            <input 
            className={s.inputDos} 
            autoComplete="off"
            type="text" 
            name="summary" 
            onChange={handleChange} 
            value={input.summary}/>
          </div>
          <div className={s.alignTres}>
            <label className={s.score}>Score:</label>
            <input 
              className={s.inputTres}
              type="number" 
              name="score"
              onChange={handleChange} 
              value={input.score}/>
          </div>
          <div className={s.alignCuatro}>
            <label className={s.healthScore}>Health Score:</label>
            <input
              className={s.inputCuatro}
              type="number" 
              name="healthLevel" 
              onChange={handleChange} 
              value={input.healthLevel}/>
          </div>
          <div className={s.alignCinco}>
            <label className={s.instructions}>Instructions:</label>
            <textarea 
             className={s.inputCinco}
              type="text" 
              name="steps" 
              onChange={handleChange} 
              value={input.steps}/>
          </div>
          <p className={s.diets}>
            Diets:
            <br/>
            {props.types && props.types.map((type)=>(
              <label className={s.types}><input
              className={s.each} 
              type="checkbox" 
              name={type.title} 
              value={type.title} 
              onChange={(e)=>handleCheck(e)}/>
              {type.title.charAt(0).toUpperCase()+ type.title.slice(1)}</label>
            ))}
          </p>
          {render[0] &&
          <div>{render}</div>
          }
          <input 
          className={s.boton} 
          type='submit'
          value='Submit'/>
          </form>
        </div>
        </motion.div>
        )
}



function mapStateToProps(state){
    return{
        types: state.types,
    }
}

function mapDispatchToProps(dispatch){
    return{
        getTypes: ()=>dispatch (getTypes()),
        postRecipe: (el)=> dispatch(postRecipe(el)),
        resetAll:()=> dispatch(resetAll())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RecipeCreate);