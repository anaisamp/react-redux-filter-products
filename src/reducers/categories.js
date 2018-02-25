import {
    FETCH_CATEGORIES_REQUESTED,
    FETCH_CATEGORIES_ERROR,
    FETCH_CATEGORIES_DONE
} from '../actions/categories';

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