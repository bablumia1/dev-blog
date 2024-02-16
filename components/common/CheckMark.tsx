import React, { FC } from "react";
import { BsCheckLg } from "react-icons/bs";

interface Props {
  visible: boolean;
}

const CheckMark: FC<Props> = ({ visible }): JSX.Element | null => {
  if (!visible) return null;
  return (
    <div className="flex items-center justify-center w-5 h-5 bg-sky-900 bg-opacity-2 backdrop-blur-sm rounded-full">
      <BsCheckLg className="text-white" />
    </div>
  );
};

export default CheckMark;
