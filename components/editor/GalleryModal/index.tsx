import React, { ChangeEventHandler, FC, useCallback, useState } from "react";
import ModalContainer, { ModalProps } from "../../common/ModalContainer";
import Gallery from "./Gallery";
import Image from "next/image";
import ActionButton from "../../common/ActionButton";
import { BsCloudUpload } from "react-icons/bs";

export interface ImageSelectionResult {
  src: string;
  altText: string;
}

interface Props extends ModalProps {
  onFileSelect(image: File): void;
  onSelect(result: ImageSelectionResult): void;
  images: { src: string }[];
  uploading?: boolean;
  loading?: boolean;
}

const GalleryModal: FC<Props> = ({
  visible,
  onClose,
  onFileSelect,
  onSelect,
  images,
  uploading,
  loading,
}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState("");
  const [altText, setAltText] = useState("");
  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files } = target;
    if (!files) return;

    const file = files[0];
    if (!file.type.startsWith("image")) return onClose && onClose();

    onFileSelect(file);
  };

  const handleSlection = () => {
    if (!selectedImage) return handleClose();
    onSelect({ src: selectedImage, altText });
    handleClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="max-w-4xl p-2 bg-gray-900 rounded">
        <div className="flex">
          <div className="basis-[75%] max-h-[450px] overflow-y-auto custom-scrollbar">
            <Gallery
              images={images}
              onSelect={(src) => setSelectedImage(src)}
              selectedImage={selectedImage}
              uploading={uploading}
              loading={loading}
            />
          </div>
          <div className="basis-1/4 p-2">
            <div className="relative">
              <input
                onChange={handleImageChange}
                type="file"
                hidden
                name=""
                id="image-input"
              />
              <label
                htmlFor="image-input"
                className="cursor-pointer flex items-center justify-center p-2 border border-gray-300 rounded-md hover:border-gray-400 transition shadow-md mb-2"
              >
                <div>
                  <BsCloudUpload className="text-white" size={30} />
                </div>
              </label>
            </div>

            {selectedImage ? (
              <>
                <textarea
                  value={altText}
                  onChange={({ target }) => setAltText(target.value)}
                  className="w-full p-2 mb-2 border border-slate-500 rounded focus:outline-none focus:ring-none focus:border-slate-200 bg-gray-800 text-white"
                  placeholder="Alt text"
                ></textarea>
                <ActionButton onClick={handleSlection} title="Select" />
                <div className="relative aspect-video bg-png-pattern">
                  <Image
                    src={selectedImage}
                    alt="gallery"
                    width={200}
                    height={200}
                    className=" w-full h-full aspect-auto object-cover "
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;
