import React from "react";
import Asynchronous from "../index";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

describe("Add dish", () => {
  afterEach(cleanup);

  it("should render correctly", () => {
    render(<Asynchronous setSelectedRecipe={() => {}} />);
  });
});
