import { FETCH_USER_RECIPES, FETCH_ADMIN_RECIPES, ADD_USER_RECIPE, 
  SEARCH_USER_RECIPE, ADD_ADMIN_RECIPE, REMOVE_USER_RECIPE , ADD_ADMIN_COMMENT } from '../actions/types';

const recipeReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_RECIPES:
    return action;
    case FETCH_ADMIN_RECIPES:
    return action;
    case ADD_USER_RECIPE:
    return {...state, state: [action.data]};
    case ADD_ADMIN_RECIPE:
    return {...state, state: [action.data]};
    case SEARCH_USER_RECIPE:
    return action.data;
    case REMOVE_USER_RECIPE:
    return {...state};
    case ADD_ADMIN_COMMENT:
    return {...state, comment:[action.data.comment]};
  default:
    return state;
  }
}
export default recipeReducer;
