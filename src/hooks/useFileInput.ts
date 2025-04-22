import { useRef } from "react";

type FileHandler<T = File> = (data: { url: string; file: T }) => void;

interface UseFileInputOptions<T = File> {
  accept?: string;
  onAdd: FileHandler<T>;
}

export function useFileInput<T = File>({
  accept,
  onAdd,
}: UseFileInputOptions<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as T | undefined;
    if (file) {
      const url = URL.createObjectURL(file as unknown as File);
      onAdd({ url, file });
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return {
    inputRef,
    handleChange,
    openFileDialog,
    accept,
  };
}
