"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {filename && (
        <div className="absolute top-0 left-0 right-0 px-4 py-2 text-xs font-mono text-muted-foreground bg-black rounded-t-lg border-b border-white/10">
          {filename}
        </div>
      )}
      <button
        onClick={copyToClipboard}
        className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
        )}
      </button>
      <pre
        className={`overflow-x-auto p-4 ${
          filename ? "pt-12" : ""
        } rounded-lg bg-black`}
      >
        <code
          className={`language-${language} text-white`}
          style={{
            backgroundColor: "transparent",
          }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
