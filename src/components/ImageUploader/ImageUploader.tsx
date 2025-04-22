import React from "react";
import { useFileInput } from "../../hooks/useFileInput";

interface ImageUploaderProps {
  onAdd: (data: { url: string; file: File }) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onAdd }) => {
  const { inputRef, handleChange, openFileDialog } = useFileInput({
    accept: "image/*",
    onAdd,
  });

  return (
    <div className="image-uploader">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <span onClick={openFileDialog} style={{ cursor: "pointer" }}>
        Добавить картинку
      </span>
    </div>
  );
};

export default ImageUploader;
