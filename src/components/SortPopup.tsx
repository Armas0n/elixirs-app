import React, { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { FilterParams } from '../typings/types';

interface SortItem {
  name: string;
  type: string;
  order: string;
}

interface SortPopupProps {
  sortItems: SortItem[];
  activeSortType: string;
  onClickSortType: (filterParams: FilterParams) => void;
}

const SortPopup = React.memo(({ sortItems, activeSortType, onClickSortType }: SortPopupProps) => {
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const activeLabel = sortItems.find((sortItem) => sortItem.type === activeSortType)?.name;

  const toggleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const handleOutsideClick = (event: PointerEvent): void => {
    const path = event.composedPath();
    if (!path.includes(sortRef.current!)) {
      setVisiblePopup(false);
    }
  };

  const onSelectItem = (filterParams: FilterParams) => {
    if (onClickSortType) {
      onClickSortType(filterParams);
    }
    setVisiblePopup(false);
  };

  useEffect(() => {
    document.body.addEventListener('pointerdown', handleOutsideClick as unknown as EventListener);
    return () => {
      document.body.removeEventListener('pointerdown', handleOutsideClick as unknown as EventListener);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={visiblePopup
            ? 'rotated'
            : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <span role="button" tabIndex={0} onClick={toggleVisiblePopup}>{activeLabel}</span>
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {sortItems &&
             sortItems.map((obj) => (
               // eslint-disable-next-line jsx-a11y/click-events-have-key-events
               <li
                 role="menuitem"
                 onClick={() => onSelectItem(obj)}
                 className={activeSortType === obj.type
                   ? 'active'
                   : ''}
                 key={v4()}>
                 {obj.name}
               </li>
             ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
