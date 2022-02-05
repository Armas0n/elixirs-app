import { ElixirItem } from '../../typings/types';

export const addElixirToCart = (elixirItem: ElixirItem) => ({
  type: 'ADD_ELIXIR_CART',
  payload: elixirItem,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

export const removeCartItem = (id: number) => ({
  type: 'REMOVE_CART_ITEM',
  payload: id,
});

export const plusCartItem = (id: number) => ({
  type: 'PLUS_CART_ITEM',
  payload: id,
});

export const minusCartItem = (id: number) => ({
  type: 'MINUS_CART_ITEM',
  payload: id,
});
