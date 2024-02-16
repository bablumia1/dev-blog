import { FC, MouseEventHandler } from "react";
import { BiLoader } from "react-icons/bi";

interface Props {
  title: string;
  busy?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ActionButton: FC<Props> = ({
  disabled,
  busy = false,
  title,
  onClick,
}): JSX.Element => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-6 py-2 mb-2 font-semibold hover:shadow-md focus:outline-none focus:ring focus:border-blue-700 rounded flex items-center justify-center space-x-2 transition ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-blue-600 hover:active:bg-blue-700"
      }`}
      onClick={onClick}
      disabled={disabled || busy}
    >
      <span className={`text-${disabled ? "gray-500" : "white"}`}>{title}</span>
      {busy && <BiLoader className="animate-spin" size={20} />}
    </button>
  );
};

export default ActionButton;
