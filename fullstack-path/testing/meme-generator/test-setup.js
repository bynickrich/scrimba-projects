import * as matchers from "@testing-library/jest-dom/matchers";
import { afterAll, afterEach, beforeAll, expect } from "vitest";

expect.extend(matchers);
import { cleanup } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// Prepare data
const memes = {
  data: {
    memes: [
      {
        url: "https://i.imgflip.com/1c1uej.jpg",
      },
    ],
  },
};

// Define handles using MSW
export const restHandlers = [
  http.get("https://api.imgflip.com/get_memes", () => {
    return HttpResponse.json(memes);
  }),
];

// Setup server
const server = setupServer(...restHandlers);

// Establish reuest interception layer before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Clean up after all test are done, preventing this
// interception layer from affecting irrelevant tests.
afterAll(() => server.close());

// Clean up handlers
afterEach(() => {
  cleanup();
});
