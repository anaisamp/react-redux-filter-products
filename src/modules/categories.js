import axios from 'axios';
import { fetchProducts } from './products';

export const FETCH_CATEGORIES_REQUESTED = 'categories/FETCH_CATEGORIES_REQUESTED';
export const FETCH_CATEGORIES_ERROR = 'categories/FETCH_CATEGORIES_ERROR';
export const FETCH_CATEGORIES_DONE = 'categories/FETCH_CATEGORIES_DONE';

const initialState = {
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

  export const fetchCategoriesAndProducts = () => {
    return (dispatch, getState) => {
      return dispatch(fetchCategories()).then(() => {
        const fetchedSeletedCategory = getState().categories[0].id;
        return dispatch(fetchProducts(fetchedSeletedCategory));
      })
    }
  }