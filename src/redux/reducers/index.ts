import { combineReducers } from 'redux';
import cart from './cart';
import elixirs from './elixirs';
import filters from './filters';

const rootReducer = combineReducers({
  filters,
  elixirs,
  cart,
});

export default rootReducer;
