import React from "react";
import ReactMarkdown from "react-markdown";
import { TBlock } from "../../types/types";

interface ArticlePreviewProps {
  title: string;
  content: TBlock[];
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ title, content }) => {
  return (
    <div className="article-preview">
      <h1>{title}</h1>
      {content.map((block, idx) => {
        switch (block.type) {
          case "text":
            return (
              <div
                key={idx}
                className="preview-text"
                dangerouslySetInnerHTML={{ __html: block.data }}
              />
            );
          case "image":
            return (
              <div key={idx} className="preview-image">
                <img
                  src={block.data.url}
                  alt="Article"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            );
          case "file":
            return (
              <div key={idx} className="preview-file">
                <a
                  href={URL.createObjectURL(block.data.file)}
                  download={block.data.name}
                >
                  📎 {block.data.name}
                </a>
              </div>
            );
          case "code":
            return (
              <div key={idx} className="preview-code">
                <ReactMarkdown>{`\`\`\`\n${block.data}\n\`\`\``}</ReactMarkdown>
              </div>
            );
          case "quote":
            return (
              <blockquote key={idx} className="preview-quote">
                {block.data}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ArticlePreview;
