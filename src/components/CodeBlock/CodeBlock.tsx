import React, { useState } from "react";

interface CodeBlockProps {
  onAdd: (data: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ onAdd }) => {
  const [code, setCode] = useState("");

  const handleAdd = () => {
    if (code.trim()) {
      onAdd(code);
      setCode("");
    }
  };

  return (
    <div className="code-block">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Вставьте markdown-код"
        rows={5}
        style={{ width: "100%" }}
      />
      <button type="button" onClick={handleAdd}>
        Добавить код
      </button>
    </div>
  );
};

export default CodeBlock;
