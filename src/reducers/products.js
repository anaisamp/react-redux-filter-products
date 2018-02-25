import {
    FETCH_PRODUCTS_REQUESTED,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_DONE,
    TOOGLE_PRODUCT_DESCRIPTION,
    FETCH_PRODUCT_FILTER
} from '../actions/products';

const initialState = {
    products: [],
    visibleProducts: [],
    isFetchingProducts: false,
    errorFetchingProducts: false,
    toogleProductDescription: [],
    selectedCategory: null,
    searchValue: '',
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
          const { products, category } = action;
        return {
          ...state,
          products: products,
          visibleProducts: products,
          isFetchingProducts: !state.isFetchingProducts,
          errorFetchingProducts: false,
          selectedCategory: category,
          toogleProductDescription: products.map(p => {
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
          const { searchValue } = action;
          const searchValueLowercase = searchValue.toLowerCase();
          const visibleProducts = searchValue 
              ? state.products.filter((p) => p.title.toLowerCase().includes(searchValueLowercase) || p.description.toLowerCase().includes(searchValueLowercase))
              : state.products;
          return { 
            ...state, 
            searchValue, 
            visibleProducts 
          };

      default:
        return state;
    }
  }