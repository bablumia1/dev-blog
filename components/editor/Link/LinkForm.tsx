import React, { FC, useEffect, useState } from "react";
import { validateUrl } from "../EditorUtils";

interface Props {
  onSubmit(link: linkOption): void;
  initialState?: linkOption;
  visible: boolean;
}
export type linkOption = {
  url: string;
  openInNewTab: boolean;
};

const LinkForm: FC<Props> = ({
  onSubmit,
  initialState,
  visible,
}): JSX.Element => {
  const [link, setLink] = useState<linkOption>({
    url: "",
    openInNewTab: false,
  });
  const handleSubmit = () => {
    onSubmit({ ...link, url: validateUrl(link.url) });
  };

  useEffect(() => {
    if (initialState) setLink({ ...initialState });
  }, [initialState]);

  return (
    <>
      {visible && (
        <div className="flex flex-col gap-4 bg-white shadow-md p-3">
          {/* Input for the URL */}
          <input
            autoFocus
            type="text"
            placeholder="Enter URL"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:border-blue-500 transition"
            value={link.url}
            onChange={({ target }) => setLink({ ...link, url: target.value })}
          />

          {/* Checkbox and label */}
          <div className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              id="open-in-new-tab"
              className="text-blue-500"
              checked={link.openInNewTab}
              onChange={({ target }) =>
                setLink({ ...link, openInNewTab: target.checked })
              }
            />
            <label htmlFor="open-in-new-tab">Open in new tab</label>
          </div>

          {/* Apply button */}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white rounded-md p-1 hover:bg-blue-600 transition"
          >
            Apply
          </button>
        </div>
      )}
    </>
  );
};

export default LinkForm;
