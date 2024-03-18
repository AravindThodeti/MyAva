import React from "react";
import HomePageTracker from "../index";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import sinon from "sinon";

describe("HomePageTracker", () => {
  afterEach(cleanup);

  it("should render correctly", () => {
    const { getByText } = render(<HomePageTracker />);
    // expect(getByText(/PCOS/i)).toBeInTheDocument();
    // expect(getByText("5")).toBeInTheDocument();
  });
});
