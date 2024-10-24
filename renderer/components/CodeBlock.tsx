import { Check, CopyIcon } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button } from "./ui/button";
import { useState } from "react";
import { useCopyToClipboard } from "@uidotdev/usehooks";

export default function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [_, copy] = useCopyToClipboard();

  const handleCopy = () => {
    copy(code);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 1500);
  };
  return (
    <div className="relative">
      <div className="flex absolute top-2 right-2">
        <Button
          className="hover:bg-opacity-70 text-muted-foreground hover:opacity-75 transition-all duration-300 ease-in-out"
          variant="ghost"
          size="icon"
          onClick={handleCopy}
        >
          {isCopied ? (
            <Check size="20" color="green" />
          ) : (
            <CopyIcon size="20" />
          )}
        </Button>
      </div>
      <div>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          wrapLines={true}
          showLineNumbers={true}
          codeTagProps={{
            style: {
              fontSize: "17px",
              fontWeight: "500",
              scrollbarWidth: "thin",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
