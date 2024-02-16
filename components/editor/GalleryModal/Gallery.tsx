import React, { FC } from "react";
import NextImage from "./NextImage";
import { BsCardImage } from "react-icons/bs";
import { BiLoader } from "react-icons/bi";

interface Props {
  images: { src: string }[];
  onSelect(src: string): void;
  uploading?: boolean;
  selectedImage: string;
  loading?: boolean;
}

const Gallery: FC<Props> = ({
  images,
  onSelect,
  uploading = false,
  selectedImage = "",
  loading = false,
}): JSX.Element => {
  return (
    <div className="flex flex-wrap ">
      {loading && (
        <div className="basis-1/4 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-900">
          <div className="flex flex-col items-center text-white">
            <BiLoader className="animate-spin text-4xl mb-2" />
            <p>Loading...</p>
          </div>
        </div>
      )}

      {uploading && (
        <div className="basis-1/4 flex items-center justify-center">
          <div className="p-1 aspect-square flex flex-col items-center justify-center bg-slate-200 rounded animate-pulse">
            <BsCardImage size={30} />
            <p>Uploading</p>
          </div>
        </div>
      )}
      {images.map((image, index) => {
        return (
          <div key={index} className="basis-1/4 p-1 ">
            <NextImage
              src={image?.src}
              selected={selectedImage === image?.src}
              onClick={() => onSelect(image?.src)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
