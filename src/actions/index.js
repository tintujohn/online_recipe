import axios from 'axios';
import { FETCH_USER_RECIPES, FETCH_ADMIN_RECIPES, ADD_USER_RECIPE, 
  SEARCH_USER_RECIPE, APPROVE_PENDING_DATA, REMOVE_USER_RECIPE, ADD_ADMIN_COMMENT } from './types';

export const fetchUserRecipe = (data) => {
  return {
    type: FETCH_USER_RECIPES,
    data
  }
};

export const fetchAdminRecipe = (data) => {
  return {
    type: FETCH_ADMIN_RECIPES,
    data
  }
};

export const addUserRecipe = (data) => {
  return {
    type: ADD_USER_RECIPE,
    data
  }
};

export const searchUserRecipe = (data) => {
  return {
    type: SEARCH_USER_RECIPE,
    data
  }
};

export const approveData = (data) => {
  return {
    type: APPROVE_PENDING_DATA,
    data
  }
};

export const removeUserRecipe = (data) => {
  return {
    type: REMOVE_USER_RECIPE,
    data
  }
};

export const addCommentData = (data) => {
  return {
    type: ADD_ADMIN_COMMENT,
    data
  }
};

export const fetchUserData = () => {
  return (dispatch) => {
    return axios.get("/user",{
    }).then(response => {
      dispatch(fetchUserRecipe(response.data))
    })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchAdminData = () => {
    return (dispatch) => {
      return axios.get("/admin")
        .then(response => {
          dispatch(fetchAdminRecipe(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  };

  export const addUserData = (data) => {
    return (dispatch) => {
      return axios.post("/user/add", {
        recipeName: data.recipeName,
        recipeDetails: data.recipeDetails
      }).then(response => {
          dispatch(addUserRecipe(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  };

  export const searchUserData = (data) => {
    return (dispatch) => {
      return axios.get("/user/"+data,{
      }).then(response => {
        dispatch(searchUserRecipe(response.data))
      })
        .catch(error => {
          throw(error);
        });
    };
  };

  export const approvePendingData = (id) => {
    return (dispatch) => {
      return axios.post("/admin/approverecipe/"+id,{
      }).then(response => {
        dispatch(approveData(response.data))
      })
        .catch(error => {
          throw(error);
        });
    };
  };

  export const removeUserData = (id) => {
    return (dispatch) => {
      return axios.delete("/admin/"+id).then(response => {
          dispatch(removeUserRecipe(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  };

  export const addAdminComment = (data) => {
    return (dispatch) => {
      return axios.post("/user/addcomment/"+data.id, {
        commentDetails: data.comment,
      }).then(response => {
          dispatch(addCommentData(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  };
