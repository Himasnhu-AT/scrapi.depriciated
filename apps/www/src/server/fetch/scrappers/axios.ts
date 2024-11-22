import { Logger } from "@/global";
import axios from "axios";

interface LogParams {
  url: string;
  scraper: string;
  success: boolean;
  response_code: number | null;
  time_taken_seconds: number | null;
  error_message: string | null;
  html: string;
  startTime: number;
}

export class FetchScrapperService {
  constructor() {}

  /**
   * Scrapes a URL with Axios
   */
  async fetchURLWithAxios(
    url: string,
    universalTimeout: number,
    allowed_content_types: string[],
    allowed_status_codes: number[],
  ): Promise<{ content: string; pageStatusCode?: number; pageError?: string }> {
    const logParams: LogParams = {
      url,
      scraper: "fetch",
      success: false,
      response_code: null,
      time_taken_seconds: null,
      error_message: null,
      html: "",
      startTime: Date.now(),
    };

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: universalTimeout,
        transformResponse: [(data) => data],
      });

      if (!allowed_status_codes.includes(response.status)) {
        Logger.debug(
          `Axios: Failed to fetch url: ${url} with status: ${response.status}`,
        );
        logParams.error_message = response.statusText;
        logParams.response_code = response.status;
        return {
          content: "",
          pageStatusCode: response.status,
          pageError: response.statusText,
        };
      }

      const contentType = response.headers["content-type"];

      if (
        contentType &&
        contentType.includes("application/pdf") &&
        allowed_content_types.includes("pdf")
      ) {
        logParams.success = true;
        // PDF handling logic would go here
        throw new Error("PDF handling not implemented");
      } else {
        const text = response.data;
        logParams.success = true;
        logParams.html = text;
        logParams.response_code = response.status;
        return {
          content: text,
          pageStatusCode: response.status,
          pageError: undefined,
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          logParams.error_message = "Request timed out";
          Logger.debug(`⛏️ Axios: Request timed out for ${url}`);
        } else {
          logParams.error_message = error.message || String(error);
          Logger.debug(`Axios: Failed to fetch url: ${url} | Error: ${error}`);
        }
        return {
          content: "",
          pageStatusCode: error.response?.status ?? undefined,
          pageError: logParams.error_message,
        };
      } else {
        logParams.error_message = String(error);
        Logger.debug(`Axios: Failed to fetch url: ${url} | Error: ${error}`);
        return {
          content: "",
          pageStatusCode: undefined,
          pageError: logParams.error_message,
        };
      }
    } finally {
      const endTime = Date.now();
      logParams.time_taken_seconds = (endTime - logParams.startTime) / 1000;
      console.log(logParams);
    }
  }
}
