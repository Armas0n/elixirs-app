import classNames from 'classnames';
import React, { useState } from 'react';

import Krona from '../assets/img/krona32x32.ico';
import { useTypedSelector } from '../redux/reduxHooks';
import { ElixirData, ElixirItem } from '../typings/types';
import Button from './Button';

type ElixirBlockProps =
  Omit<ElixirData, 'category' | 'rating'>
  & { onClickAddElixir: (ElixirItem: ElixirItem) => void };

function ElixirBlock({ id, name, imageUrl, price, sizes, onClickAddElixir, description }: ElixirBlockProps) {
  const cartItems = useTypedSelector(({ cart }) => cart.items);
  const availableSizes = [0.5, 1, 2];
  const [activeSizeIndex, setActiveSizeIndex] = useState<number>(0);

  const onSelectSize = (index: number) => {
    setActiveSizeIndex(index);
  };

  const priceCalculator = () => {
    const chosenSize = availableSizes[activeSizeIndex];

    switch (chosenSize) {
      case 0.5:
        return Math.round(price);
      case 1:
        return Math.round(price * 1.9);
      case 2:
        return Math.round(price * 3.5);
      default:
        return Math.round(price);
    }
  };

  const addedCount = cartItems[id + (availableSizes[activeSizeIndex] * priceCalculator())]?.items.length;

  const onAddElixir = () => {
    onClickAddElixir({
      id: id + (availableSizes[activeSizeIndex] * priceCalculator()),
      name,
      imageUrl,
      price: priceCalculator(),
      size: availableSizes[activeSizeIndex],
    });
  };

  return (
    <div className="elixir-block">
      <img className="elixir-block__image" src={imageUrl} alt={name} />
      <h4 className="elixir-block__title">{name}</h4>
      <div className="elixir-block__selector">
        <ul>
          {availableSizes.map((size, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
              role="menuitem"
              key={size}
              onClick={() => onSelectSize(index)}
              className={classNames({
                active: activeSizeIndex === index,
                disabled: !sizes.includes(size),
              })}>
              {size} ??.
            </li>
          ))}
        </ul>
      </div>
      <div className="elixir-block__description">
        <i>{description}</i>
      </div>
      <div className="elixir-block__bottom">
        <div className="elixir-block__price">{priceCalculator()} ????????
          <img className="elixir-block__currency" src={Krona} alt="krona currency" />
        </div>
      </div>
      <Button onClick={onAddElixir} className="button--add" outline>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
            fill="white"
          />
        </svg>
        <span>????????????????</span>
        {addedCount && <i>{addedCount}</i>}
      </Button>
    </div>
  );
}

export default ElixirBlock;
