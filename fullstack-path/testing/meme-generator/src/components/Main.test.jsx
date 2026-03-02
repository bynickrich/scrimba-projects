import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Main from "./Main";

describe("Main component", () => {
  test("Test default text and image rendering", () => {
    render(<Main />);
    expect(screen.getByRole("img").src).toBe("https://i.imgflip.com/1bij.jpg");
    expect(screen.getByText("One does not simply")).toBeInTheDocument();
    expect(screen.getByText("Walk into Mordor")).toBeInTheDocument();
  });

  // Labels
  test("Input labels render", () => {
    render(<Main />);
    expect(screen.getByText("Top Text")).toBeInTheDocument();
    expect(screen.getByText("Bottom Text")).toBeInTheDocument();
  });

  // Input fields placeholders
  test("Inputs have placeholder text", () => {
    render(<Main />);
    expect(
      screen.getByPlaceholderText("One does not simply"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Walk into Mordor")).toBeInTheDocument();
  });

  // Button with default text
  test("Button", () => {
    render(<Main />);
    expect(screen.getByRole("button")).toHaveTextContent(
      "Get a new meme image 🖼",
    );
  });
});
