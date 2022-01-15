import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, ElixirBlock, ElixirLoadingBlock, SortPopup } from '../components';
import { addElixirToCart } from '../redux/actions/cart';
import { fetchElixirs } from '../redux/actions/elixirs';

import { setCategory, setSortBy } from '../redux/actions/filters';

const categoryNames = ['Реагенты', 'Эликсиры', 'Масла', 'Отвары', 'Особое'];
const sortItems = [
  { name: 'популярности', type: 'rating', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'наименованию', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ elixirs }) => elixirs.items);
  const isLoaded = useSelector(({ elixirs }) => elixirs.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  useEffect(() => {
    dispatch(fetchElixirs(sortBy, category));
  }, [category, sortBy, dispatch]);

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  }, [dispatch]);

  const onSelectSortType = useCallback((filterParams) => {
    dispatch(setSortBy(filterParams));
  }, [dispatch]);

  const handleAddElixirToCart = (obj) => {
    dispatch(addElixirToCart(obj));
  };

  return (
      <div className="container">
        <div className="content__top">
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
        </div>
        <h2 className="content__title">Все эликсиры</h2>
        <div className="content__items">
          {isLoaded
              ? items.map((elixirObj) => (
                  <ElixirBlock
                      onClickAddElixir={handleAddElixirToCart}
                      key={elixirObj.id}
                      {...elixirObj}
                  />
              ))
              : Array(12)
                  .fill(0)
                  .map((_, index) => <ElixirLoadingBlock key={index} />)}
        </div>
      </div>
  );
}

export default Home;
