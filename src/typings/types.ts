export interface ElixirItem {
  id: number;
  name: string,
  imageUrl: string,
  price: number;
  size: number;
}

export interface ElixirData {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export interface FiltersState {
  category: number | null;
  sortBy: {
    type: string;
    order: string;
  };
}

export interface FilterParams {
  type: string;
  order: string;
}

export interface ElixirsState {
  items: ElixirData[];
  isLoaded: boolean;
}

export interface CartState {
  items: { [key: string | number]: any; };
  totalPrice: number;
  totalCount: number;
}
