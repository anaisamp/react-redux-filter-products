import axios from 'axios';
export const FETCH_CATEGORIES_REQUESTED = 'categories/FETCH_CATEGORIES_REQUESTED';
export const FETCH_CATEGORIES_ERROR = 'categories/FETCH_CATEGORIES_ERROR';
export const FETCH_CATEGORIES_DONE = 'categories/FETCH_CATEGORIES_DONE';

const initialState = {
    selectedCategory: null,
    categories: [],
    isFetchingCategories: false,
    errorFetchingCategories: false,
  }

  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CATEGORIES_REQUESTED:
        return {
          ...state,
          isFetchingCategories: true
        }

        case FETCH_CATEGORIES_ERROR:
            return {
            ...state,
            isFetchingCategories: false,
            errorFetchingCategories: true
          }
  
      case FETCH_CATEGORIES_DONE:
        return {
          ...state,
          selectedCategory: action.categories[0].id,
          categories : action.categories,
          isFetchingCategories: !state.isFetchingCategories,
          errorFetchingCategories: false,
        }

      default:
        return state
    }
  }

  export const fetchCategories = () => {
    return dispatch => {
      dispatch({
        type: FETCH_CATEGORIES_REQUESTED,
      });
  
      return axios.get('https://api.gousto.co.uk/products/v2.0/categories')
        .then((res) => {
            dispatch({
              type: FETCH_CATEGORIES_DONE,
              categories: res.data.data,
          });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_CATEGORIES_ERROR,
            });
        })
    }
  }

