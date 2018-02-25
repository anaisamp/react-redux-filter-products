import {
    TOOGLE_PRODUCT_DESCRIPTION,
    FETCH_PRODUCT_FILTER
} from '../actions/products';

import ProductsReducer from './products';


describe('Products Reducer', () => {
    it('should return a new state after search for a product', () => {
        const initialState = {
            products: [{id:'0', title:'ABC'}],
            visibleProducts: [{id:'0', title:'ABC'}],
            isFetchingProducts: false,
            errorFetchingProducts: false,
            toogleProductDescription: [],
            selectedCategory: null,
            searchValue: '',
        }
        const newState = {
            ...initialState,
            searchValue: 'ABC',
        }

        expect(ProductsReducer(initialState, {searchValue: 'ABC', type: FETCH_PRODUCT_FILTER})).toEqual(newState);
    });

    it('should return a new state after toogle a product description', () => {
        const initialState = {
            products: [{id:'0', title:'ABC'}],
            visibleProducts: [{id:'0', title:'ABC'}],
            isFetchingProducts: false,
            errorFetchingProducts: false,
            toogleProductDescription: [false],
            selectedCategory: null,
            searchValue: '',
        }
        const newState = {
            ...initialState,
            toogleProductDescription: [true],
        }

        expect(ProductsReducer(initialState, {index: 0, type: TOOGLE_PRODUCT_DESCRIPTION})).toEqual(newState);
    });
});