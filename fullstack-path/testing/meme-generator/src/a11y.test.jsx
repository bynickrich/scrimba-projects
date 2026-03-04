import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Accessibility tests", () => {
  test("ensures troll face image is accessible", () => {
    render(<App />);

    expect(screen.getByAltText("troll face")).toBeInTheDocument();
  });

  test("meme image is accessible", () => {
    render(<App />);
    expect(screen.getByAltText("One Does Not Simply")).toBeInTheDocument();
  });
});
