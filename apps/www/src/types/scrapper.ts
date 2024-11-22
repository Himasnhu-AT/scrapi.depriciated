export interface ScrapedElement {
  tag: string;
  text?: string;
  html?: string;
}

export interface FetchURLOptions {
  universalTimeout: number;
  allowed_content_types: string[];
  allowed_status_codes: number[];
}

export interface FetchURLResult {
  content: ScrapedElement[];
  pageStatusCode?: number;
  pageError?: string | null;
}
