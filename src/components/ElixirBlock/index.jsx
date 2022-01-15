import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Krona from '../../assets/img/krona32x32.ico';
import Button from '../Button';

function ElixirBlock({ id, name, imageUrl, price, sizes, onClickAddElixir, description }) {
  const cartItems = useSelector(({ cart }) => cart.items);

  const availableSizes = [0.5, 1, 2];
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);

  const onSelectSize = (index) => {
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
                <li
                    key={size}
                    onClick={() => onSelectSize(index)}
                    className={classNames({
                      active: activeSizeIndex === index,
                      disabled: !sizes.includes(size),
                    })}>
                  {size} л.
                </li>
            ))}
          </ul>
        </div>
        <div className="elixir-block__description">
          <i>{description}</i>
        </div>
        <div className="elixir-block__bottom">
          <div className="elixir-block__price">{priceCalculator()} крон
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
          <span>Добавить</span>
          {addedCount && <i>{addedCount}</i>}
        </Button>
      </div>
  );
}

ElixirBlock.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  types: PropTypes.arrayOf(PropTypes.number),
  sizes: PropTypes.arrayOf(PropTypes.number),
  onClickAddElixir: PropTypes.func,
};

ElixirBlock.defaultProps = {
  name: '---',
  price: 0,
  types: [],
  sizes: [],
};

export default ElixirBlock;
