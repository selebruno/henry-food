import {filterBy} from '../utils'


export function getRecipesByName(name) {      //accion que me trae las recetas por nombre
    return function (dispatch) {
        return fetch ('http://localhost:5000/recipes?name=' + name)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: 'GET_RECIPES_BY_NAME',
                    payload: json
                });
            });
    };
}

export function getTypes() {             //accion que me trae los tipos de dieta
    return function(dispatch){
        return fetch('http://localhost:5000/types/')
        .then(response => response.json())
        .then(json =>{
            dispatch({
                type: 'GET_TYPES',
                payload: json
            })
        })
    }
}


export function getRecipeById(id) {               //accion que obtiene una receta por id
    return function (dispatch) {
        return fetch("http://localhost:5000/recipes/" + id)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: 'GET_RECIPE_BY_ID',
                    payload: json
                });
            });
    };
}

export function postRecipe(payload) {     //accion para crear una nueva receta
    return { 
        type: 'POST_RECIPE', 
        payload
    };
  };

  
export const resetAll = () => {
    return (dispatch) => {
      dispatch({
        type: 'RESET',
      });
    };
  };

  export function orderByName(payload) {            //accion que me ordena alfabeticamente las recetas
    return {
        
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function filterDiet(payload) {
  return { 
      type: 'FILTER_DIET', 
      payload: payload,
  };
};
export const filterDietTwo = (types) => (dispatch, getState) => {
    let filteredDiets = [];
  
    if (types === "All") {
      filteredDiets = getState().recipesSearch.slice();
    } else {
      filteredDiets = filterBy(getState().recipesSearch, types)
    };
    dispatch({
      type: "FILTER_DIET_TWO",
      payload: {
        types,
        filteredDiets: filteredDiets,
      },
    });
  };
export function orderByScore(payload) {         //accion que ordena por puntaje las recetas
    return {
        type: 'ORDER_BY_SCORE',
        payload
    }
}
export function showLoader(){
    return (dispatch) => {
        dispatch({
          type: 'SHOW_LOADER',
        });
      };
    };

    export function hideLoader(){
        return (dispatch) => {
            dispatch({
              type: 'HIDE_LOADER',
            });
          };
        };

  