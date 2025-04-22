import React from "react";
import { useFileInput } from "../../hooks/useFileInput";

interface FileUploaderProps {
  onAdd: (data: { url: string; file: File }) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onAdd }) => {
  const { inputRef, handleChange, openFileDialog } = useFileInput({
    accept: "*",
    onAdd,
  });

  return (
    <div className="file-uploader">
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <span onClick={openFileDialog} style={{ cursor: "pointer" }}>
        Добавить файл
      </span>
    </div>
  );
};

export default FileUploader;
