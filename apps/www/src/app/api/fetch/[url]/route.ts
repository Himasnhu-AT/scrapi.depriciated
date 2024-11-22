import { GlobalVarsService } from "@/global";
import { FetchService } from "@/server/fetch/scrape";
import { FetchScrapperService } from "@/server/fetch/scrappers/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (request.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  try {
    const body = await request.json();
    const { url } = body as {
      url: string;
    };

    const scraper = await scrapeSingleWebsite({ url });

    if ("error" in scraper) {
      return NextResponse.json({ error: scraper.error }, { status: 500 });
    }

    const markdown = scraper.content;

    return NextResponse.json({ content: markdown }, { status: 200 });
  } catch (error) {
    console.error("Error fetching URL:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 },
    );
  }
}

async function scrapeSingleWebsite(body: { url: string }) {
  const url: string = body.url;

  if (!url) {
    return { error: "URL is required" };
  }

  const pageOptions = {
    universalTimeout: 30000, // Changed from string to number
    allowed_content_types: ["html"], // Changed to array to match the expected type
    allowed_status_codes: [200],
  };

  // Create instances of the services
  const globalVarsService = new GlobalVarsService();
  const fetchScrapperService = new FetchScrapperService();
  const fetchService = new FetchService(
    globalVarsService,
    fetchScrapperService,
  );

  try {
    const result = await fetchService.FetchURL({
      url,
      scrapper: "axios",
      options: pageOptions,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
