import React, { useState } from "react";

import RichTextEditor from "../RichTextEditor/RichTextEditor";
import ArticlePreview from "../ArticlePreview/ArticlePreview";
import ImageUploader from "../ImageUploader/ImageUploader";
import FileUploader from "../FileUploader/FileUploader";
import CodeBlock from "../CodeBlock/CodeBlock";
import QuoteBlock from "../QuoteBlock/QuoteBlock";

import { supabase } from "../../supabase/client";
import { TBlock } from "../../types/types";

const ArticleEditor: React.FC = () => {
  const [content, setContent] = useState<TBlock[]>([]);
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(false);

  const addBlock = <T extends TBlock["type"]>(
    type: T,
    data: Extract<TBlock, { type: T }>["data"]
  ) => {
    setContent([...content, { type, data } as TBlock]);
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("articles")
      .insert([{ title, content, created_at: new Date().toISOString() }]);
    if (!error) {
      setContent([]);
      setTitle("");
      alert("Статья сохранена!");
    } else {
      alert("Ошибка сохранения: " + error.message);
    }
  };

  return (
    <div className="article-editor">
      <input
        type="text"
        placeholder="Заголовок статьи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={() => setPreview(!preview)}>
        {preview ? "Редактировать" : "Предпросмотр"}
      </button>
      {!preview ? (
        <>
          <RichTextEditor onAdd={(data) => addBlock("text", data)} />
          <ImageUploader onAdd={(data) => addBlock("image", data)} />
          <FileUploader
            onAdd={(data) =>
              addBlock("file", { file: data.file, name: data.file.name })
            }
          />
          <CodeBlock onAdd={(data) => addBlock("code", data)} />
          <QuoteBlock onAdd={(data) => addBlock("quote", data)} />
          <button onClick={handleSave}>Сохранить статью</button>
        </>
      ) : (
        <ArticlePreview title={title} content={content} />
      )}
    </div>
  );
};

export default ArticleEditor;
