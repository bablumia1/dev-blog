import React, { FC, useState } from "react";
import Button from "../TollBar/Button";
import { BsLink45Deg } from "react-icons/bs";
import LinkForm, { linkOption } from "./LinkForm";

interface Props {
  onSubmit(link: linkOption): void;
}

const InsertLink: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };
  const handleSubmit = (link: linkOption) => {
    if (!link.url.trim()) return setIsFormVisible(false);
    onSubmit(link);
    setIsFormVisible(false);
  };

  return (
    <div
      onKeyDown={({ key }) => {
        if (key === "Escape") setIsFormVisible(false);
      }}
      className="relative"
    >
      {/* Button with link icon */}
      <Button onClick={toggleFormVisibility}>
        <BsLink45Deg />
      </Button>

      {/* Link form */}

      <div className="absolute top-full mt-2 z-50 right-0">
        <LinkForm onSubmit={handleSubmit} visible={isFormVisible} />
      </div>
    </div>
  );
};

export default InsertLink;
