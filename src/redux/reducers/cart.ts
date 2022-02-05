import { AnyAction } from 'redux';
import { CartState, ElixirItem } from '../../typings/types';

const initialState: CartState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

type ItemsWithPrice = {
  items: ElixirItem[];
  totalPrice: number;
};

const getTotalPrice = (arr: ElixirItem[]): number => arr.reduce((sum, obj) => obj.price + sum, 0);

const getKeys = (obj: ItemsWithPrice, path: string) => {
  const [firstKey, ...keys] = path.split('.');
  return keys.reduce((val, key) => val[key], obj[firstKey]);
};

const getTotalSum = (items: { [id: number]: ItemsWithPrice }, path: string) =>
  Object.values(items)
    .reduce((sum, obj) => {
      const value = getKeys(obj, path);
      return sum + value;
    }, 0);

const cart = (state = initialState, action: AnyAction): CartState => {
  switch (action.type) {
    case 'ADD_ELIXIR_CART': {
      const currentElixirItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentElixirItems,
          totalPrice: getTotalPrice(currentElixirItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'REMOVE_CART_ITEM': {
      const newItems = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    case 'PLUS_CART_ITEM': {
      const newObjItems = [...state.items[action.payload].items, state.items[action.payload].items[0]];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'MINUS_CART_ITEM': {
      const oldItems = state.items[action.payload].items;
      const newObjItems = oldItems.length > 1
        ? state.items[action.payload].items.slice(1)
        : oldItems;
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'CLEAR_CART':
      return {
        totalPrice: 0,
        totalCount: 0,
        items: {},
      };

    default:
      return state;
  }
};

export default cart;
