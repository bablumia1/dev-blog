import React, { FC, ReactNode, useState } from "react";

interface Props {
  options: { label: string; onClick(): void }[];
  head: ReactNode;
}

const DropdownOptions: FC<Props> = ({ head, options }): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <button
      className="relative"
      onClick={() => setShowOptions(!showOptions)}
      onBlur={() => setShowOptions(false)}
    >
      {head}
      {showOptions && (
        <div className="absolute z-10 mt-4 text-left bg-white border border-gray-900 min-w-max top-full right-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          <ul className="p-3 space-y-3">
            {options.map(({ label, onClick }, index) => {
              return (
                <li
                  key={label}
                  onMouseDown={onClick}
                  className="block w-full p-2 text-left text-gray-700 dark:text-white hover:bg-gray-700 hover:text-white"
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </button>
  );
};

export default DropdownOptions;
