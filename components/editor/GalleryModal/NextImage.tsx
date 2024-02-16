import Image from "next/image";
import React, { FC } from "react";
import CheckMark from "../../common/CheckMark";

interface Props {
  src: string;
  selected?: boolean;
  onClick?(): void;
}

const NextImage: FC<Props> = ({ src, selected, onClick }): JSX.Element => {
  return (
    <div className="relative rounded overflow-hidden h-full cursor-pointer">
      <div className="w-full h-full">
        <Image
          src={src}
          alt="gallery"
          onClick={onClick}
          className=" w-full h-full aspect-auto object-cover "
          width={480}
          height={480}
        />
      </div>
      <div className="absolute top-2 left-2">
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export default NextImage;
