import React, { FC, useState } from "react";
import Button from "../TollBar/Button";
import { BsYoutube } from "react-icons/bs";

interface Props {
  onSubmit(link: string): void;
}

const EmbadeYoutube: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [url, setUrl] = useState("");

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleSubmit = () => {
    if (!url.trim()) {
      setIsFormVisible(false);
      return;
    }

    onSubmit(url);
    setIsFormVisible(false);
    setUrl(""); // Clear the input field after submitting
  };

  return (
    <div className="relative">
      {/* Button with YouTube icon */}
      <Button onClick={toggleFormVisibility} active={isFormVisible}>
        <BsYoutube />
      </Button>

      {/* Link form */}
      {isFormVisible && (
        <div className="absolute top-full mt-2 z-50 right-0 bg-white p-4 rounded-md shadow-md">
          <div className="flex items-center space-x-2">
            <input
              autoFocus
              type="text"
              placeholder="Enter YouTube URL"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:border-blue-500 transition flex-1"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbadeYoutube;
