import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import categories from './categories';
import products from './products';

export default combineReducers({
  routing: routerReducer,
  categories,
  products,
});