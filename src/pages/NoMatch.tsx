import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImage from '../assets/img/merchant.webp';

function NoMatch() {
  return (
    <div className="cart cart--empty">
      <h2>
        Вы ошиблись дверью! Товары тут не хранятся <i>😕</i>
      </h2>
      <p>
        Для покупки лучших ведьмачьих эликсиров вернитесь к главному прилавку
      </p>
      <img src={cartEmptyImage} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться к главному прилавку</span>
      </Link>
    </div>
  );
}

export default NoMatch;
