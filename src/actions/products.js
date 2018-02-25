import axios from 'axios';
export const FETCH_PRODUCTS_REQUESTED = 'products/FETCH_PRODUCTS_REQUESTED';
export const FETCH_PRODUCTS_ERROR = 'products/FETCH_PRODUCTS_ERROR';
export const FETCH_PRODUCTS_DONE = 'products/FETCH_PRODUCTS_DONE';
export const TOOGLE_PRODUCT_DESCRIPTION = 'products/TOOGLE_PRODUCT_DESCRIPTION';
export const FETCH_PRODUCT_FILTER = 'products/FETCH_PRODUCT_FILTER';

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
};

export const filterProductByCategory = (category, products) => {
  const categoriesFiltered =  products.map(p => p.categories.filter(c => c.id === category));
  const productsFiltered = products.filter((p, i) => categoriesFiltered[i].length > 0);
    return {
      type: FETCH_PRODUCTS_DONE,
      products: productsFiltered,
      category,
  };
};

export const toogleProductDescriptionVisibility = (index) => {
  return {
      type: TOOGLE_PRODUCT_DESCRIPTION,
      index
  }
};

export const fetchProductsFilter = (searchValue) => {
  return {
      type: FETCH_PRODUCT_FILTER,
      searchValue
  }
};