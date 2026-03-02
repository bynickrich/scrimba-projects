import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Main from "./Main";

test("Test default text and image rendering", () => {
  render(<Main />);
  expect(screen.getByRole("img").src).toBe("https://i.imgflip.com/1bij.jpg");
  expect(screen.getByText("One does not simply")).toBeInTheDocument();
  expect(screen.getByText("Walk into Mordor")).toBeInTheDocument();
});
