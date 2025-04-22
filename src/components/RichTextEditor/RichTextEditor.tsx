import React, { useRef } from "react";

interface RichTextEditorProps {
  onAdd: (data: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onAdd }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const format = (command: string, value?: string) => {
    // execCommand - deprecated но все еще работает в браузерах
    document.execCommand(command, false, value);
    // Focus back to editor after formatting
    editorRef.current?.focus();
  };

  const handleAdd = () => {
    const html = editorRef.current?.innerHTML || "";
    if (html.replace(/<(.|\n)*?>/g, "").trim()) {
      onAdd(html);
      if (editorRef.current) editorRef.current.innerHTML = "";
    }
  };

  return (
    <div className="rich-text-editor">
      <div className="toolbar">
        <button type="button" onClick={() => format("bold")} title="Bold">
          <b>B</b>
        </button>
        <button type="button" onClick={() => format("italic")} title="Italic">
          <i>I</i>
        </button>
        <button
          type="button"
          onClick={() => format("underline")}
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          onClick={() => format("formatBlock", "<h2>")}
          title="Heading"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => format("formatBlock", "<blockquote>")}
          title="Blockquote"
        >
          ❝
        </button>
        <button
          type="button"
          onClick={() => format("removeFormat")}
          title="Remove formatting"
        >
          ✖
        </button>
      </div>
      <div
        ref={editorRef}
        className="editor-area"
        contentEditable
        style={{
          minHeight: "100px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          marginBottom: "8px",
          background: "#fff",
        }}
        spellCheck={true}
        suppressContentEditableWarning={true}
      />
      <button type="button" onClick={handleAdd}>
        Добавить текст
      </button>
    </div>
  );
};

export default RichTextEditor;
