import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { userEvent } from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  test("Update top text", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);
    const topTextbox = screen.getAllByRole("textbox")[0];

    // Act
    await user.clear(topTextbox);
    await user.type(topTextbox, "A coder does not simply");

    // Assert
    expect(screen.getByText("A coder does not simply")).toBeInTheDocument();
  });

  test("Update bottom text", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);
    const bottomTextbox = screen.getAllByRole("textbox")[1];

    // Act
    await user.clear(bottomTextbox);
    await user.type(bottomTextbox, "Code without coffee");

    // Assert
    expect(screen.getByText("Code without coffee")).toBeInTheDocument();
  });

  test("Fetch meme on press", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);
    const newMemeBtn = screen.getByRole("button");

    // Act
    await user.pointer(newMemeBtn);
    await user.click(newMemeBtn);

    // Assert
    expect(screen.getAllByRole("img")[1].src).toBe(
      "https://i.imgflip.com/1c1uej.jpg",
    );
  });
});
