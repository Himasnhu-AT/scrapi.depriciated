# Scrapi

[![Build and Test Backend](https://github.com/Himasnhu-AT/scrapi/actions/workflows/buildAndTest_backend.yml/badge.svg)](https://github.com/Himasnhu-AT/scrapi/actions/workflows/buildAndTest_backend.yml)
[![Build and Test Frontend](https://github.com/Himasnhu-AT/scrapi/actions/workflows/buildAndTest_frontend.yml/badge.svg)](https://github.com/Himasnhu-AT/scrapi/actions/workflows/buildAndTest_frontend.yml)

Scrape websites and make them LLM ready.

## Installation

To install the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Himasnhu-AT/scrapi.git
cd scrapi
```

2. Install dependencies:

```bash
pnpm i
```

## Usage

1. Provide the URL or domain you want to scrape.

2. Get the data in an array of JSON format.

### Example

Here's an example of how to use the FetchService to scrape a URL and get the data in JSON format:

```ts
import FetchSingleURL from "scrapi";

const url = "http://example.com";
const options = {
  universalTimeout: 30000,
  allowed_content_types: ["html"],
  allowed_status_codes: [200],
};

FetchSingleURL({ url, scrapper: "axios", options })
  .then((result) => {
    console.log(result.content);
  })
  .catch((error) => {
    console.error("Error fetching URL:", error);
  });
```

### API

#### FetchURL

Fetches the content of a URL and returns it in JSON format.

**Parameters:**

- `url` (string): The URL to fetch.
- `scrapper` (string): The scrapper to use (default: 'axios').
- `options` (object): Optional parameters for the request.
  - `universalTimeout` (number): The timeout for the request (default: 30000 ms).
  - `allowed_content_types` (string[]): The allowed content types (default: ['html']).
  - `allowed_status_codes` (number[]): The allowed status codes (default: [200]).

**Returns:**

- A promise that resolves to an object containing the fetched content in JSON format.

## Development

### Backend

To start the backend server, run:

```bash
cd scrapi/apps/backend
pnpm run dev
```

### Frontend

To start the frontend server, run:

```bash
cd scrapi/apps/www
npm run dev
```

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to reach out to us at [Hyattherate2005@gmail.com](mailto:Hyattherate2005@gmail.com).
