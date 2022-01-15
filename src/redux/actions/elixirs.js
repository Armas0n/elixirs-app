import axios from 'axios';

export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});

export const fetchElixirs = (sortBy, category) =>
    async (dispatch) => {
      dispatch({
        type: 'SET_LOADED',
        payload: false,
      });
      axios
          .get(
              `/elixirs?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${
                  sortBy.order
              }`,
          )
          .then(({ data }) => {
            dispatch(setElixirs(data));
          }).catch(reason => console.log(reason.message));
    };

export const setElixirs = (items) => ({
  type: 'SET_ELIXIRS',
  payload: items,
});
