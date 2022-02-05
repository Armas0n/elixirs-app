import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ElixirData, FiltersState } from '../../typings/types';
import { RootState } from '../store';

export const setLoaded = (payload: boolean) => ({
  type: 'SET_LOADED',
  payload,
});

export const setElixirs = (items: ElixirData[]) => ({
  type: 'SET_ELIXIRS',
  payload: items,
});

export const fetchElixirs = (sortBy: FiltersState['sortBy'],
  category: FiltersState['category']): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({
      type: 'SET_LOADED',
      payload: false,
    });
    axios.get<ElixirData[]>(`/elixirs?${category !== null
      ? `category=${category}`
      : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
      .then(({ data }) => { dispatch(setElixirs(data)); })
      .catch(reason => reason.message);
  };
