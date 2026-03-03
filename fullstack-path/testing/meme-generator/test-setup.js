import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { rest } from "msw";
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
  rest.get("https://api.imgfli.com/get_memes", (req, res, ctx) => {
    return res(ctx.json(memes));
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
