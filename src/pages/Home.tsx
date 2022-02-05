import React, { useCallback, useEffect } from 'react';
import { v4 } from 'uuid';

import { Categories, ElixirBlock, ElixirLoadingBlock, SortPopup } from '../components';
import { addElixirToCart } from '../redux/actions/cart';
import { fetchElixirs } from '../redux/actions/elixirs';

import { setCategory, setSortBy } from '../redux/actions/filters';
import { useTypedDispatch, useTypedSelector } from '../redux/reduxHooks';

import { ElixirItem } from '../typings/types';

interface CategoriesMap {
  [key: number]: string;
}

const categoryNames = ['Реагенты', 'Эликсиры', 'Масла', 'Отвары', 'Особое'];

const categoriesMap: CategoriesMap = {
  0: 'Реагенты',
  1: 'Эликсиры',
  2: 'Масла',
  3: 'Отвары',
  4: 'Особое',
};

const sortItems = [
  { name: 'популярности', type: 'rating', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'наименованию', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useTypedDispatch();
  const items = useTypedSelector(({ elixirs }) => elixirs.items);
  const isLoaded = useTypedSelector(({ elixirs }) => elixirs.isLoaded);
  const { category, sortBy } = useTypedSelector(({ filters }) => filters);

  useEffect(() => {
    dispatch(fetchElixirs(sortBy, category));
  }, [category, sortBy, dispatch]);

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  }, [dispatch]);

  const onSelectSortType = useCallback((filterParams) => {
    dispatch(setSortBy(filterParams));
  }, [dispatch]);

  const handleAddElixirToCart = (obj: ElixirItem) => {
    dispatch(addElixirToCart(obj));
  };

  const contentTitleHandler = (categories: CategoriesMap): string => {
    if (category === null) return 'Все товары';
    return categories[category];
  };

  return (
    <div className="container">
      <nav className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
          activeSortType={sortBy.type}
          sortItems={sortItems}
          onClickSortType={onSelectSortType}
        />
      </nav>
      <h2 className="content__title">{contentTitleHandler(categoriesMap)}</h2>
      <section className="content__items">
        {isLoaded
          ? items.map((elixirObj) => (
            <ElixirBlock
              onClickAddElixir={handleAddElixirToCart}
              key={elixirObj.id}
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...elixirObj}
            />
          ))
          : Array(12)
            .fill(0)
            .map(() => <ElixirLoadingBlock key={v4()} />)}
      </section>
    </div>
  );
}

export default Home;
