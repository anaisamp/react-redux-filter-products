import axios from 'axios';
export const FETCH_PRODUCTS_REQUESTED = 'products/FETCH_PRODUCTS_REQUESTED';
export const FETCH_PRODUCTS_ERROR = 'products/FETCH_PRODUCTS_ERROR';
export const FETCH_PRODUCTS_DONE = 'products/FETCH_PRODUCTS_DONE';
export const TOOGLE_PRODUCT_DESCRIPTION = 'products/TOOGLE_PRODUCT_DESCRIPTION';
export const FETCH_PRODUCT_FILTER = 'products/FETCH_PRODUCT_FILTER';

const initialState = {
    products: [],
    isFetchingProducts: false,
    errorFetchingProducts: false,
    toogleProductDescription: [],
    selectedCategory: null
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
            errorFetchingProducts: true,
          }
  
      case FETCH_PRODUCTS_DONE:
        return {
          ...state,
          products: action.products,
          isFetchingProducts: !state.isFetchingProducts,
          errorFetchingProducts: false,
          selectedCategory: action.category,
          toogleProductDescription: action.products.map(p => {
            return p.toogleProductDescription || false;
          })
        }

      case TOOGLE_PRODUCT_DESCRIPTION:
        return {
          ...state,
          toogleProductDescription: state.toogleProductDescription.map( (p, i) => {
            if(i === action.index) {
              return state.toogleProductDescription[i] = !state.toogleProductDescription[i];
            }
            return state.toogleProductDescription[i];
          })
        }
        case FETCH_PRODUCT_FILTER:
        return {
          ...state,
          products: state.products.map( (p, i) => {
            return p.title.contains(action.term) ? state.products.push(p) : null;
          })
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
  
      return axios.get(`https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort=position&image_sizes[]=365&i mage_sizes[]=400&period_id=120`)
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

const filterProductByCategory = (category, products) => {
  const categoriesFiltered =  products.map(p => p.categories.filter(c => c.id === category));
  const productsFiltered = products.filter((p, i) => categoriesFiltered[i].length > 0);

    return ({
      type: FETCH_PRODUCTS_DONE,
      products: productsFiltered,
      category,
  });
};

export const toogleProductDescriptionVisibility = (index) => {
  return dispatch => {
    dispatch({
      type: TOOGLE_PRODUCT_DESCRIPTION,
      index
    });
  }
};

export const fetchProductsFilter = (term) => {
  return dispatch => {
    dispatch({
      type: FETCH_PRODUCT_FILTER,
      term
    });
  }
};