import Image from "next/image";
import React, { ChangeEventHandler, FC, useEffect, useState } from "react";
import { BsImageFill } from "react-icons/bs";

interface Props {
  initaialValue?: string;
  onChange: (file: File) => void;
}

const ThumbnailSelector: FC<Props> = ({
  initaialValue,
  onChange,
}): JSX.Element => {
  const [selectedThumbnail, setSelectedThumbnail] = useState("");

  const handleThumbnailChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files } = target;
    if (!files) return;
    const file = files[0];
    setSelectedThumbnail(URL.createObjectURL(file));
    onChange(file);
  };

  useEffect(() => {
    if (typeof initaialValue === "string") setSelectedThumbnail(initaialValue);
  }, [initaialValue]);

  return (
    <div className="w-32">
      <input
        type="file"
        name=""
        id="thumbnail"
        accept="image/jpg,image/png,image/jpeg"
        hidden
        onChange={handleThumbnailChange}
      />
      <label
        htmlFor="thumbnail"
        className="block w-full h-32 overflow-hidden bg-gray-200 rounded-md cursor-pointer"
      >
        {selectedThumbnail ? (
          <Image
            height={200}
            width={200}
            src={selectedThumbnail}
            alt="thumbnail"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-gray-500">
              <BsImageFill size={30} />
            </p>
          </div>
        )}
      </label>
    </div>
  );
};

export default ThumbnailSelector;
