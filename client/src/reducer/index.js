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
    loading: false,
    filterBy: 'All',
    filteredRecipes : [],


};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES_BY_NAME':
            return {
                ...state,
                recipesSearch: action.payload.results,
                filteredRecipes: action.payload.results
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
                                sortAsc(state.filteredRecipes, 'name') :
                                sortDesc(state.filteredRecipes, 'name');
                            return {
                                ...state,
                                filteredRecipes: sortedArr
                            }
                            case 'ORDER_BY_SCORE':
                                return {
                                    ...state,
                                    filteredRecipes:  state.filteredRecipes.sort(function (a, b) {
                                        if (action.payload === 'Lowest') {
                                            return a.score - b.score;
                                        }
                                        if (action.payload === 'Highest') {
                                            return b.score - a.score;
                                        } 
                                    }), 
                                } 
        

                                case 'FILTER_DIET_TWO':

                                    return {
                                        ...state,
                                        filteredRecipes: action.payload.filteredDiets,
                                            filterBy: action.payload.types,
                                    };
    }
    return state;
}


export default reducer;