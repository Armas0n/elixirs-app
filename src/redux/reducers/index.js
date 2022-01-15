import { combineReducers } from 'redux';

import filters from './filters';
import elixirs from './elixirs';
import cart from './cart';

const rootReducer = combineReducers({
  filters,
  elixirs,
  cart,
});

export default rootReducer;
