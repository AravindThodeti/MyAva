import React from "react";
import SquareDateItemWithDay from "../SquareDateItemWithDay";
import { cleanup, getByTestId } from "@testing-library/react";
import ReactDom from "react-dom";
import "@testing-library/jest-dom/extend-expect";

describe("SquareDateItemWithDay", () => {
  afterEach(cleanup);

  it("should render correctly", () => {
    const container = document.createElement("div");
    ReactDom.render(
      <SquareDateItemWithDay
        selectedDate="13"
        setSelectedDate={() => {}}
        date="23"
        day="Wed"
      />,
      container
    );
    expect(getByTestId(container, "date-element")).toHaveTextContent("23");
    expect(getByTestId(container, "day-element")).toHaveTextContent("Wed");
  });
});
