import { EditorContent, Range, getMarkRange, useEditor } from "@tiptap/react";
import { ChangeEventHandler, FC, use, useEffect, useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import TipTapImage from "@tiptap/extension-image";

import Toolbar from "./TollBar";
import EditLink from "./Link/EditLink";
import GalleryModal, { ImageSelectionResult } from "./GalleryModal";
import axios from "axios";
import SEOForm, { SeoResult } from "./SEOForm";
import ThumbnailSelector from "../common/ThumbnailSelector";
import ActionButton from "../common/ActionButton";

export interface FinalPost extends SeoResult {
  id?: string;
  title: string;
  content: string;
  thumbnail?: File | string;
}

interface Props {
  initialValues?: FinalPost;
  btnTitle?: string;
  onSubmit: (post: FinalPost) => void;
  busy?: boolean;
}

const Editor: FC<Props> = ({
  initialValues,
  btnTitle = "Publish",
  onSubmit,
  busy = false,
}): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seoInitialValues, setSeoInitialValues] = useState<SeoResult>();
  const [post, setPost] = useState<FinalPost>({
    title: "",
    content: "",
    slug: "",
    tags: "",
    meta: "",
  });

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/image");
      const { data } = response;
      setImages(data.images);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post("/api/image", formData);
      setImages([data, ...images]);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: "mx-auto rounded",
        },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: "ma-auto",
        },
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          "prose prose-lg focus:outline focus:outline-gray-300 max-w-full mx-auto h-full p-3 dark:text-white",
      },
    },
    content: "<p>Hello World! 🌎️</p>",
  });

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageSelection = (result: ImageSelectionResult) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: result.src, alt: result.altText })
      .run();
  };

  const updateTile: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setPost({ ...post, title: target.value });

  const updateThumbnail = (file: File) => setPost({ ...post, thumbnail: file });

  const updateSeoValues = (values: SeoResult) =>
    setPost({ ...post, ...values });

  useEffect(() => {
    if (initialValues) {
      setPost({ ...initialValues });
      editor?.commands.setContent(initialValues.content);

      const { meta, tags, slug } = initialValues;
      setSeoInitialValues({ meta, tags, slug });
    }
  }, [initialValues, editor]);

  const handleSubmit = () => {
    if (!editor) return;
    onSubmit({ ...post, content: editor.getHTML() });
  };
  return (
    <div className="flex flex-col">
      {/* Thumbnail selector and Publish button */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950">
        <div className="flex items-center justify-between mb-4">
          <ThumbnailSelector
            onChange={updateThumbnail}
            initaialValue={post.thumbnail as string}
          />
          <ActionButton title={btnTitle} busy={busy} onClick={handleSubmit} />
        </div>
        {/* Title input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter title..."
            value={post.title}
            onChange={updateTile}
            name="title"
            className="py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-black dark:text-white mb-3 "
          />
        </div>

        {/* Toolbar */}
        <Toolbar
          editor={editor}
          onOpenImageClick={() => setShowGallery(true)}
        />
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-2 overflow-y-auto">
        {editor ? <EditLink editor={editor} /> : null}
        <EditorContent
          editor={editor}
          className="min-h-[400px] dark:text-white"
        />
        <div className="h-[1px] w-full bg-gray-300 my-3" />
      </div>

      {/* SEO Form */}
      <SEOForm onChange={updateSeoValues} initialValue={seoInitialValues} />

      {/* Gallery Modal */}
      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        images={images}
        onFileSelect={handleImageUpload}
        uploading={uploading}
        loading={loading}
      />
    </div>
  );
};

export default Editor;
