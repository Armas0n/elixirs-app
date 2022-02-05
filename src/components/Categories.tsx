import React from 'react';
import { v4 } from 'uuid';

interface CategoriesProps {
  activeCategory: number | null;
  items: string[];
  onClickCategory: (index: number | null) => void;
}

const Categories = React.memo(({ activeCategory, items, onClickCategory }: CategoriesProps) => (
  <div className="categories">
    <ul>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <li
        className={activeCategory === null
          ? 'active'
          : ''}
        onClick={() => onClickCategory(null)}
        role="menuitem"
      >
        Все
      </li>
      {items &&
       items.map((name, index) => (
         // eslint-disable-next-line jsx-a11y/click-events-have-key-events
         <li
           className={activeCategory === index
             ? 'active'
             : ''}
           onClick={() => onClickCategory(index)}
           role="menuitem"
           key={v4()}>
           {name}
         </li>
       ))}
    </ul>
  </div>
));

export default Categories;
