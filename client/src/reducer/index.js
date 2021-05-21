import axios from "axios";
import {
    sortAsc,
    sortDesc,
    filterBy
} from '../utils'


const initialState = {
    recipesSearch: [], //recetas por nombre 
    types: [],
    recipeById: [], //receta por id
    filtered:' ',
    loading: false


};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES_BY_NAME':
            return {
                ...state,
                recipesSearch: action.payload.results
            };
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            };
        case 'GET_RECIPE_BY_ID':
            return {
                ...state,
                recipeById: action.payload
            };
        case 'POST_RECIPE':
            axios.post('http://localhost:5000/recipe', action.payload)
            return {
                ...state,
                submit: 'Recipe created Succesfully'
            }
             case 'FILTER_DIET':
                return {
                    ...state,
                    filtered:action.payload==='reset'? ' ': state.filtered+' | '+action.payload,
                    recipesSearch:filterBy(state.recipesSearch, action.payload),
                    };
                  

            case 'SHOW_LOADER':
                return {
                    ...state,
                    loading: true
                }
                case 'HIDE_LOADER':
                    return {
                        ...state,
                        loading: false
                    }
                    case 'RESET':
                        return {
                            ...state,
                            recipesSearch: [],
                                types: [],
                                postedRecipe: [],
                                recipeById: {},
                                filteredRecipes: [],
                                orderedRecipes: [],
                                filterBy: 'All',
                                loading: false
                        }
                        case 'ORDER_BY_NAME':
                            let sortedArr = action.payload === 'asc' ?
                                sortAsc(state.recipesSearch, 'name') :
                                sortDesc(state.recipesSearch, 'name');
                            return {
                                ...state,
                                recipesSearch: sortedArr
                            }
                            case 'ORDER_BY_SCORE':
                                return {
                                    ...state,
                                    recipesSearch: state.recipesSearch.sort(function (a, b) {
                                        if (action.payload === 'Lowest') {
                                            return a.score - b.score;
                                        }
                                        if (action.payload === 'Highest') {
                                            return b.score - a.score;
                                        }
                                    }),
                                }
    }
    return state;
}


export default reducer;