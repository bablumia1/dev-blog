import { FC, useCallback, useState } from "react";
import { BsBoxArrowUpRight, BsPencilSquare } from "react-icons/bs";
import { BiUnlink } from "react-icons/bi";
import { BubbleMenu, Editor } from "@tiptap/react";
import LinkForm, { linkOption } from "./LinkForm";

interface Props {
  editor: Editor;
}

const EditLink: FC<Props> = ({ editor }): JSX.Element => {
  const [showEditForm, setShowEditForm] = useState(false);
  const handleOnLinkOpenClick = useCallback(() => {
    const { href } = editor.getAttributes("link");
    if (href) {
      window.open(href, "_blank");
    }
  }, [editor]);

  const handleLinkEditClick = () => {
    setShowEditForm(true);
  };

  const handleUnlinkClick = () => {
    editor.commands.unsetLink();
  };
  const handleSubmit = ({ url, openInNewTab }: linkOption) => {
    editor
      .chain()
      .focus()
      .unsetLink()
      .setLink({ href: url, target: openInNewTab ? "_blank" : "" })
      .run();
    setShowEditForm(false);
  };

  const getInitialState = useCallback(() => {
    const { href, target } = editor.getAttributes("link");
    return { url: href, openInNewTab: target ? true : false };
  }, [editor]);

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor }) => {
        return editor.isActive("link");
      }}
      tippyOptions={{
        onHide: () => {},
      }}
    >
      <LinkForm
        onSubmit={handleSubmit}
        initialState={getInitialState()}
        visible={showEditForm}
      />
      {!showEditForm && (
        <div className="rounded bg-white  text-primary shadow-secondary-dark shadow-md p-3 flex items-center space-x-6 z-50">
          <button onClick={handleOnLinkOpenClick}>
            <BsBoxArrowUpRight />
          </button>

          <button onClick={handleLinkEditClick}>
            <BsPencilSquare />
          </button>

          <button onClick={handleUnlinkClick}>
            <BiUnlink />
          </button>
        </div>
      )}
    </BubbleMenu>
  );
};

export default EditLink;
