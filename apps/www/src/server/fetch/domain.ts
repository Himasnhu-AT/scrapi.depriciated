import axios from "axios";
import { load } from "cheerio";
import { URL } from "url";

interface SiteConfig {
  language: string;
  documentationLink: string;
  urlPrefix: string;
}

export class DomainScraper {
  private config: SiteConfig;
  private relevantUrls: Set<string> = new Set();
  private visitedUrls: Set<string> = new Set();
  private pendingUrls: Set<string> = new Set();
  private baseUrl: string;
  private isProduction: boolean;

  constructor(config: SiteConfig) {
    this.config = config;
    this.baseUrl = config.documentationLink;
    this.isProduction = process.env.NODE_ENV === "production";
  }

  private log(message: string, type: "info" | "error" | "debug" = "info") {
    if (this.isProduction) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${type.toUpperCase()}]`;

    switch (type) {
      case "error":
        console.error(`${prefix} ${message}`);
        break;
      case "debug":
        console.debug(`${prefix} ${message}`);
        break;
      default:
        console.log(`${prefix} ${message}`);
    }
  }

  private logStats() {
    if (this.isProduction) return;

    this.log("Current Scraping Stats:", "debug");
    this.log(`- Pending URLs: ${this.pendingUrls.size}`, "debug");
    this.log(`- Visited URLs: ${this.visitedUrls.size}`, "debug");
    this.log(`- Relevant URLs: ${this.relevantUrls.size}`, "debug");
  }

  async scrapeUrls(startPath: string): Promise<string[]> {
    const startUrl = new URL(startPath, this.baseUrl).toString();

    // Only start scraping if the starting URL matches our criteria
    if (this.shouldProcessUrl(startUrl)) {
      this.pendingUrls.add(startUrl);
      this.log(`Starting scrape from: ${startUrl}`);
    } else {
      this.log(
        `Starting URL ${startUrl} doesn't match criteria, skipping`,
        "error",
      );
      return [];
    }

    while (this.pendingUrls.size > 0) {
      const currentUrl = Array.from(this.pendingUrls)[0];
      this.pendingUrls.delete(currentUrl);

      if (this.visitedUrls.has(currentUrl)) {
        this.log(`Skipping already visited URL: ${currentUrl}`, "debug");
        continue;
      }

      try {
        this.log(`Scraping page: ${currentUrl}`);
        const response = await axios.get(currentUrl);
        const $ = load(response.data);

        this.visitedUrls.add(currentUrl);
        this.log(`Successfully scraped: ${currentUrl}`);

        let newUrlsFound = 0;
        $("a").each((_, element) => {
          const href = $(element).attr("href");
          if (!href) return;

          try {
            const fullUrl = new URL(href, this.baseUrl).toString();

            // Remove hash fragment for storing and checking
            const urlWithoutHash = this.removeHashFromUrl(fullUrl);

            if (this.shouldProcessUrl(urlWithoutHash)) {
              // Store URL without hash in relevantUrls if not already present
              if (!this.relevantUrls.has(urlWithoutHash)) {
                this.relevantUrls.add(urlWithoutHash);
                this.log(`Found new relevant URL: ${urlWithoutHash}`, "debug");
              }

              // Add to pending if not processed
              if (
                !this.visitedUrls.has(urlWithoutHash) &&
                !this.pendingUrls.has(urlWithoutHash)
              ) {
                this.pendingUrls.add(urlWithoutHash);
                newUrlsFound++;
              }
            }
          } catch (error) {
            this.log(`Error processing URL ${href}: ${error}`, "error");
          }
        });

        this.log(`Found ${newUrlsFound} new URLs to process on ${currentUrl}`);
        this.logStats();
      } catch (error) {
        this.log(`Error scraping ${currentUrl}: ${error}`, "error");
      }
    }

    this.log("Scraping completed");
    this.logStats();
    return Array.from(this.relevantUrls);
  }

  private shouldProcessUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);

      // Check if URL starts with the prefix and doesn't have a hash
      const meetsPrefix = url.startsWith(this.config.urlPrefix);
      const hasNoHash = parsedUrl.hash === "";

      if (!meetsPrefix) {
        this.log(
          `URL ${url} doesn't start with prefix ${this.config.urlPrefix}`,
          "debug",
        );
      }
      if (!hasNoHash) {
        this.log(`URL ${url} contains a hash fragment`, "debug");
      }

      return meetsPrefix && hasNoHash;
    } catch {
      return false;
    }
  }

  private removeHashFromUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);
      parsedUrl.hash = "";
      return parsedUrl.toString();
    } catch {
      return url;
    }
  }
}
