import React from "react";
import { getScoreByBmi } from "../../../constants/healthScore";
import { cleanup, getByTestId, queryByText } from "@testing-library/react";
import HealthScoreStepOne from "..";
import ReactDom from "react-dom";
import "@testing-library/jest-dom/extend-expect";

describe("Health score calculator", () => {
  afterEach(cleanup);

  it("should get the bmi score correctly", () => {
    expect(getScoreByBmi(20)).toEqual(10);
    expect(getScoreByBmi(15.9)).toEqual(Math.round(18.5 - 15.9) * -1);
    expect(getScoreByBmi(26.3)).toEqual(Math.round(26.3 - 24.9) * -1);
    expect(getScoreByBmi(39)).toEqual(Math.round(39 - 24.9) * -2);
  });
  it("renders health score step one component", () => {
    const container = document.createElement("div");
    ReactDom.render(
      <HealthScoreStepOne handleChangeStep={() => {}} />,
      container
    );
    expect(
      queryByText(container, "Please answer all the above questions")
    ).toEqual(null);
  });
});
