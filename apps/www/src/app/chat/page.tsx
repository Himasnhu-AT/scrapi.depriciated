"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Copy, CheckCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import LoadingScreen from "@/components/loading-screen";
import { MDXComponents } from "@/components/mdx/MDXConponents";

export default function ScrapiPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [scrapedUrl, setScrapedUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setScrapedUrl(url);

    try {
      const response = await fetch(`/api/fetch/${encodeURIComponent(url)}`, {
        method: "POST",
        body: JSON.stringify({ url }),
      });
      if (!response.ok) throw new Error("Failed to fetch content");

      const data = await response.json();
      setMarkdown(data.content);
    } catch (error) {
      console.error("Error fetching content:", error);
      setMarkdown("Sorry, I couldn't fetch the content. Please try again.");
    } finally {
      setIsLoading(false);
      setUrl("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Scrapi</CardTitle>
        </CardHeader>
        <CardContent>
          {markdown ? (
            <>
              <div className="mb-4">
                <strong>Scraped URL:</strong> {scrapedUrl}
              </div>
              <ScrollArea className="h-[60vh] w-full pr-4 border rounded-md p-4">
                <ReactMarkdown components={MDXComponents}>
                  {markdown}
                </ReactMarkdown>
              </ScrollArea>
              <Button className="mt-4" onClick={handleCopy}>
                {isCopied ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Markdown
                  </>
                )}
              </Button>
            </>
          ) : (
            <p>Enter a URL to scrape and convert to markdown.</p>
          )}
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <Input
              type="url"
              placeholder="Enter a URL to scrape..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" />
              Scrape
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
