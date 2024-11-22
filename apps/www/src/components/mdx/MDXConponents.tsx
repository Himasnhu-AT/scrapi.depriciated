import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "./CodeBlock";
import React from "react";

export const MDXComponents = {
  // Headings
  h1: (props: any) => (
    <h1 {...props} className="text-4xl font-bold tracking-tight mt-16 mb-8" />
  ),
  h2: (props: any) => (
    <h2
      {...props}
      className="text-3xl font-semibold tracking-tight mt-12 mb-6"
    />
  ),
  h3: (props: any) => (
    <h3
      {...props}
      className="text-2xl font-semibold tracking-tight mt-8 mb-4"
    />
  ),
  h4: (props: any) => (
    <h4 {...props} className="text-xl font-semibold tracking-tight mt-6 mb-3" />
  ),

  // Text elements
  p: (props: any) => (
    <p
      {...props}
      className="text-lg leading-relaxed mb-6 text-muted-foreground"
    />
  ),

  // Lists
  ul: (props: any) => (
    <ul
      {...props}
      className="list-disc list-outside pl-6 mb-6 space-y-2 text-muted-foreground"
    />
  ),
  ol: (props: any) => (
    <ol
      {...props}
      className="list-decimal list-outside pl-6 mb-6 space-y-2 text-muted-foreground"
    />
  ),
  li: (props: any) => <li {...props} className="leading-relaxed" />,

  // Inline elements
  a: (props: any) => (
    <Link
      {...props}
      className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
    />
  ),
  strong: (props: any) => <strong {...props} className="font-semibold" />,
  em: (props: any) => <em {...props} className="italic" />,

  // Updated code blocks
  pre: ({ children, ...props }: any) => {
    // Extract code content and language from children
    const childArray = React.Children.toArray(children);
    const code = childArray[0] as React.ReactElement;

    if (code.type !== "code") {
      return <pre {...props}>{children}</pre>;
    }

    const className = code.props.className || "";
    const matches = className.match(/language-(?<lang>.*)/);
    const language = matches?.groups?.lang ?? "";

    // Check for filename in meta
    const meta = code.props.meta || "";
    const filename = meta.match(/filename="(?<filename>.*)"/)?.groups?.filename;

    return (
      <CodeBlock
        code={code.props.children.trim()}
        language={language}
        filename={filename}
      />
    );
  },

  code: ({ children, className, ...props }: any) => {
    // Handle inline code blocks
    if (!className) {
      return (
        <code {...props} className="bg-white/10 rounded px-1">
          {children}
        </code>
      );
    }

    // Handle code blocks with language
    const matches = className.match(/language-(?<lang>.*)/);
    const language = matches?.groups?.lang ?? "";

    // Check for filename in meta
    const meta = props.meta || "";
    const filename = meta.match(/filename="(?<filename>.*)"/)?.groups?.filename;

    return (
      <CodeBlock
        code={children.trim()}
        language={language}
        filename={filename}
      />
    );
  },

  // Media
  Image: (props: any) => (
    <div className="relative aspect-[2/1] my-8 rounded-lg overflow-hidden">
      <Image
        {...props}
        alt={props.alt || "Image, no alt given"}
        fill
        className="object-cover"
      />
    </div>
  ),

  // Blockquotes
  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="border-l-4 border-primary/20 pl-6 italic my-6 text-muted-foreground"
    />
  ),

  // Horizontal rule
  hr: (props: any) => <hr {...props} className="my-12 border-white/10" />,
};
