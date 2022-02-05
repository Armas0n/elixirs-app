import { FilterParams } from '../../typings/types';

export const setSortBy = ({ type, order }: FilterParams) => ({
  type: 'SET_SORT_BY',
  payload: {
    type,
    order,
  },
});

export const setCategory = (catIndex: number | null) => ({
  type: 'SET_CATEGORY',
  payload: catIndex,
});
