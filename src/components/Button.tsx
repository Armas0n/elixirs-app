import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface ButtonProps {
  className: string;
  children: ReactNode;
  onClick?: () => void;
  outline?: boolean;
}

function Button({ onClick, className, outline, children }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {children}
    </button>
  );
}

export default Button;
