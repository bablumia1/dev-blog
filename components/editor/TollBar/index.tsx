import { Editor } from "@tiptap/react";
import React, { FC } from "react";
import DropdownOptions from "../../common/DropdownOptions";
import { getFocusedEditor } from "../EditorUtils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsTypeStrikethrough,
  BsCode,
  BsBraces,
  BsLink45Deg,
  BsListOl,
  BsListUl,
  BsYoutube,
  BsImage,
} from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";
import InsertLink from "../Link/InsertLink";
import { linkOption } from "../Link/LinkForm";
import EmbadeYoutube from "./EmbadeYoutube";

/**
 * What we need in this text editor ?
 * Heading 1,2,3
 * Bold, Italic, Underline, Strike, Quote, Code, Code block
 * Insert-link, Lists (Ol and ul), Embaded youtube,
 * Image
 */

interface Props {
  editor: Editor | null;
  onOpenImageClick?(): void;
}

const Toolbar: FC<Props> = ({
  editor,
  onOpenImageClick,
}): JSX.Element | null => {
  if (!editor) return null;

  const options = [
    {
      label: "Heading 1",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run(),
    },
    {
      label: "Paragraph",
      onClick: () => {
        getFocusedEditor(editor).setParagraph().run();
      },
    },
  ];
  const getLabel = (): string => {
    if (editor.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor.isActive("heading", { level: 3 })) return "Heading 3";
    return "Paragraph";
  };

  const handleLinkSubmit = ({ url, openInNewTab }: linkOption) => {
    if (openInNewTab) editor.commands.setLink({ href: url, target: "_blank" });
    else editor.commands.setLink({ href: url });
  };

  const Head = () => {
    return (
      <div className="flex items-center space-x-1 ">
        <p className="dark:text-black">{getLabel()}</p>
        <ChevronDownIcon className="w-4 text-dark" />
      </div>
    );
  };
  const handleEmbedYoutube = (url: string) => {
    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };

  return (
    <div className="flex items-center p-4 space-x-4 bg-white shadow-md">
      {/* Dropdown Options */}
      <DropdownOptions options={options} head={<Head />} />

      {/* Buttons */}
      <Button
        active={editor.isActive("bold")}
        onClick={() => getFocusedEditor(editor).toggleBold().run()}
      >
        <BsTypeBold />
      </Button>
      <Button
        active={editor.isActive("italic")}
        onClick={() => getFocusedEditor(editor).toggleItalic().run()}
      >
        <BsTypeItalic />
      </Button>
      <Button
        active={editor.isActive("underline")}
        onClick={() => getFocusedEditor(editor).toggleUnderline().run()}
      >
        <BsTypeUnderline />
      </Button>
      <Button
        active={editor.isActive("strike")}
        onClick={() => getFocusedEditor(editor).toggleStrike().run()}
      >
        <BsTypeStrikethrough />
      </Button>
      <Button
        active={editor.isActive("blockquote")}
        onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}
      >
        <RiDoubleQuotesL />
      </Button>
      <Button
        active={editor.isActive("code")}
        onClick={() => getFocusedEditor(editor).toggleCode().run()}
      >
        <BsCode />
      </Button>
      <Button
        active={editor.isActive("codeBlock")}
        onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}
      >
        <BsBraces />
      </Button>
      <InsertLink onSubmit={handleLinkSubmit} />
      <Button
        active={editor.isActive("orderedList")}
        onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}
      >
        <BsListOl />
      </Button>
      <Button
        active={editor.isActive("bulletList")}
        onClick={() => getFocusedEditor(editor).toggleBulletList().run()}
      >
        <BsListUl />
      </Button>
      <EmbadeYoutube onSubmit={(url) => handleEmbedYoutube(url)} />
      <Button onClick={onOpenImageClick}>
        <BsImage />
      </Button>
    </div>
  );
};

export default Toolbar;
