import {
  FetchURLOptions,
  FetchURLResult,
  ScrapedElement,
} from "../../types/scrapper";

describe("Types", () => {
  it("should define ScrapedElement type correctly", () => {
    const element: ScrapedElement = {
      tag: "p",
      text: "This is a paragraph.",
    };
    expect(element.tag).toBe("p");
    expect(element.text).toBe("This is a paragraph.");
  });

  it("should define FetchURLOptions type correctly", () => {
    const options: FetchURLOptions = {
      universalTimeout: 30000,
      allowed_content_types: ["html"],
      allowed_status_codes: [200],
    };
    expect(options.universalTimeout).toBe(30000);
    expect(options.allowed_content_types).toContain("html");
    expect(options.allowed_status_codes).toContain(200);
  });

  it("should define FetchURLResult type correctly", () => {
    const result: FetchURLResult = {
      content: [
        {
          tag: "h1",
          text: "Hello, World!",
        },
      ],
      pageStatusCode: 200,
      pageError: null,
    };
    expect(result.content[0].tag).toBe("h1");
    expect(result.pageStatusCode).toBe(200);
    expect(result.pageError).toBeNull();
  });
});
