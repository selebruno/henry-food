import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getTypes,postRecipe} from '../../actions/index'



export function validate(input){   //hago la validacion de los scores
    let errors = {};
    if (input.spoonacularScore>100  || input.spoonacularScore<0){
        errors.spoonacularScore = 'Please insert a valid score';
    }
    if(!input.healthScore>100 ||input.healthScore<0){
        errors.healthScore = 'Please insert a valid Health level'
    }
    return errors;
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

    const handleCheck = function(e){
        if(e.target.checked){
          setInput({...input, types: [...input.types,e.target.value]});
        }else{
          setInput({...input, types: input.diets.filter((diet)=>diet!==e.target.value)})
        };
      };
    
      const handleSubmit = function(e){
        e.preventDefault();
        props.postRecipe(input)
        setRender('Your recipe was created!')
        setInput({
          name: ' ',
          summary: ' ',
          score:0,
          healthLevel:0,
          steps: ' ',
          types: [],
        })
      }
    
      useEffect(() => {
        getTypes()
        return () => {
        }
      }, [])
        return (
          <div>
            <div>Post your own Recipe</div>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <Link to='/home'> <button> X </button> </Link>
          <div>
            <label>Title:</label>
            <input type="text" name="title" onChange={handleChange} value={input.name}/>
          </div>
          <div>
            <label>Summary:</label>
            <input autoComplete="off"
              type="text" name="summary" onChange={handleChange} value={input.summary}/>
          </div>
          <div>
            <label>Score:</label>
            <input 
              type="number" name="spoonacularScore" onChange={handleChange} value={input.score}/>
            {errors.spoonacularScore && (
            <p>{errors.spoonacularScore}</p>
            )}
          </div>
          <div>
            <label>healthScore:</label>
            <input
              type="number" name="healthScore" onChange={handleChange} value={input.healthLevel}/>
              {errors.healthScore && (
              <p>{errors.healthScore}</p>
            )}
          </div>
          <div>
            <label>Instructions:</label>
            <textarea 
              type="text" name="instructions" onChange={handleChange} value={input.steps}/>
          </div>
          <p>
            Diets:
            {props.types.length>0 && props.types.map((type)=>(
              <label><input type="checkbox" name={type.name} value={type.name} onChange={(e)=>handleCheck(e)}/>{type.name}</label>
            ))}
          </p>
          {render[0] &&
          <div id='recipecreated'>{render}</div>
          }
          <input type='submit'value='Submit'id='submitbutton'/>
          </form>
        </div>
        )
}



function mapStateToProps(state){
    return{
        types: state.types,
        postRecipe: state.postedRecipe
    }
}

function mapDispatchToProps(dispatch){
    return{
        types: ()=>dispatch (getTypes()),
        postRecipe: (el)=> dispatch(postRecipe(el))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RecipeCreate);