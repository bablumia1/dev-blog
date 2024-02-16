import React, { ChangeEventHandler, FC, useEffect, useState } from "react";
import slugify from "slugify";

export interface SeoResult {
  slug: string;
  tags: string;
  meta: string;
}

interface Props {
  title?: string;
  initialValue?: SeoResult;
  onChange: (result: SeoResult) => void;
}

const SEOForm: FC<Props> = ({ title = "", initialValue, onChange }) => {
  const [values, setValues] = useState({
    slug: "",
    tags: "",
    meta: "",
  });

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = ({ target }) => {
    let { name, value } = target;
    if (name === "meta") value = value.substring(0, 150);
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    onChange(newValues);
  };

  useEffect(() => {
    const slug = slugify(title.toLowerCase());
    const newValues = { ...values, slug };
    setValues(newValues);
    onChange(newValues);
  }, [title]);

  useEffect(() => {
    if (initialValue) {
      setValues({
        ...initialValue,
        slug: slugify(initialValue.slug, {
          strict: true,
        }),
      });
    }
  }, [initialValue]);
  const { slug, tags, meta } = values;
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">SEO Information</h2>
      <form className="space-y-4">
        {/* Slug Input */}
        <Input
          label="Slug"
          name="slug"
          value={slug}
          onChange={handleChange}
          placeholder="slug-goes-here"
        />
        {/* Tags Input */}
        <Input
          label="Tags"
          name="tags"
          value={tags}
          onChange={handleChange}
          placeholder="React, Next JS"
        />
        {/* Meta Description Textarea */}
        <div className="relative">
          <label
            htmlFor="metaDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Meta Description
          </label>
          <textarea
            name="meta"
            rows={3}
            value={meta}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Meta description 150 characters will be fine"
          ></textarea>
          <p className="absolute bottom-3 right-3 text-primary-dark dark:text-primary text-sm">
            {meta.length}/150
          </p>
        </div>
      </form>
    </div>
  );
};

interface InputProps {
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="mt-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>
  );
};

export default SEOForm;
