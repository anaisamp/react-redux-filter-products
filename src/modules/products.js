import axios from 'axios';
export const FETCH_PRODUCTS_REQUESTED = 'products/FETCH_PRODUCTS_REQUESTED';
export const FETCH_PRODUCTS_ERROR = 'products/FETCH_PRODUCTS_ERROR';
export const FETCH_PRODUCTS_DONE = 'products/FETCH_PRODUCTS_DONE';

const initialState = {
    products: [],
    isFetchingProducts: false,
    errorFetchingProducts: false,
  }

  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUESTED:
        return {
          ...state,
          isFetchingProducts: true
        }

        case FETCH_PRODUCTS_ERROR:
            return {
            ...state,
            isFetchingProducts: false,
            errorFetchingProducts: true
          }
  
      case FETCH_PRODUCTS_DONE:
        return {
          ...state,
          //products : filterProductByCategory(action.category, action.products),
          products: action.products,
          isFetchingProducts: !state.isFetchingProducts,
          errorFetchingProducts: false,
        }

      default:
        return state
    }
  }

  export const fetchProducts = (category) => {
    return dispatch => {
      dispatch({
        type: FETCH_PRODUCTS_REQUESTED,
        category,
      });
  
      return axios.get(`https://api.gousto.co.uk/products/v2.0/products?includes[]=categories`)
        .then((res) => {
          dispatch(filterProductByCategory(category, res.data.data));
        })
        .catch((err) => {
            dispatch({
                type: FETCH_PRODUCTS_ERROR,
            });
        })
    }
  }

 function filterProductByCategory(c, products) {
   console.log(products);
    const n = products.filter( p => p.categories[0].title === c );
    console.log(n);
    return ({
      type: FETCH_PRODUCTS_DONE,
      products: products,
      category: c,
  });
};