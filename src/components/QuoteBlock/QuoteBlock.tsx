import React, { useState } from "react";

interface QuoteBlockProps {
  onAdd: (data: string) => void;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ onAdd }) => {
  const [quote, setQuote] = useState("");

  const handleAdd = () => {
    if (quote.trim()) {
      onAdd(quote);
      setQuote("");
    }
  };

  return (
    <div className="quote-block">
      <textarea
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        placeholder="Введите цитату"
        rows={2}
        style={{ width: "100%" }}
      />
      <button type="button" onClick={handleAdd}>
        Добавить цитату
      </button>
    </div>
  );
};

export default QuoteBlock;
