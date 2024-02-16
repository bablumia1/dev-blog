import React, { FC, MouseEventHandler, ReactNode, useCallback } from "react";

interface Props {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<Props> = ({
  children,
  active,
  disabled,
  onMouseDown,
  onClick,
}): JSX.Element => {
  const getActiveStyle = useCallback((): string => {
    return active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700";
  }, [active]);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
      className={`px-4 outline-none py-2 rounded ${getActiveStyle()} cursor-pointer`}
      name="button"
      aria-label="button"
    >
      {children}
    </button>
  );
};

export default Button;
