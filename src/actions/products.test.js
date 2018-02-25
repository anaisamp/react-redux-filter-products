import { 
    filterProductByCategory,
    toogleProductDescriptionVisibility,
    fetchProductsFilter,

    TOOGLE_PRODUCT_DESCRIPTION,
    FETCH_PRODUCT_FILTER,
    FETCH_PRODUCTS_DONE

 } from './products';

it('creates a FETCH_PRODUCT_FILTER action', () => {
    const searchValue = "drink";
    const expectedAction = {
        type: FETCH_PRODUCT_FILTER,
        searchValue
    }
  expect(fetchProductsFilter(searchValue)).toEqual(expectedAction);
});

it('creates a TOOGLE_PRODUCT_DESCRIPTION action', () => {
    const expectedAction = {
        type: TOOGLE_PRODUCT_DESCRIPTION,
        index: 0,
    }
  expect(toogleProductDescriptionVisibility(0)).toEqual(expectedAction);
});


it('creates a FETCH_PRODUCTS_DONE action', () => {
    const mockProducts = [];
    const category = "Drinks";
    const expectedAction = {
        type: FETCH_PRODUCTS_DONE,
        products: mockProducts,
        category
    }
  expect(filterProductByCategory(category, mockProducts)).toEqual(expectedAction);
});