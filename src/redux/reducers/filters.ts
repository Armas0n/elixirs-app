import { AnyAction } from 'redux';
import { FiltersState } from '../../typings/types';

const initialState: FiltersState = {
  category: null,
  sortBy: {
    type: 'rating',
    order: 'desc',
  },
};

const filters = (state = initialState, action: AnyAction): FiltersState => {
  if (action.type === 'SET_SORT_BY') {
    return {
      ...state,
      sortBy: action.payload,
    };
  }
  if (action.type === 'SET_CATEGORY') {
    return {
      ...state,
      category: action.payload,
    };
  }
  return state;
};

export default filters;
