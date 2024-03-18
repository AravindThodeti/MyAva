import React from "react";
import NutrientValueBar, { getProgressColor, nutrientColors } from "../index";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import sinon from "sinon";

describe("NutrientValueBar", () => {
  afterEach(cleanup);

  it("should render correctly", () => {
    const { getByText } = render(
      <NutrientValueBar
        nutrientName="Protein"
        consumed={60}
        prescribedValue={120}
        unit={"gm"}
      />
    );
    expect(getByText(/Protein/i)).toBeInTheDocument();
    expect(getByText(/\60/ && /\120/ && /gm/)).toBeInTheDocument();
  });

  it("should warn if required props are not valid", () => {
    let stub;
    stub = sinon.stub(console, "error");
    render(
      <NutrientValueBar
        nutrientName="Protein"
        consumed={"60"}
        prescribedValue={120}
        unit={"gm"}
      />
    );
    expect(stub.calledOnce).toEqual(true);
    expect(stub.getCall(0).args[0]).toMatch(
      /Invalid prop `consumed` of type `string`/
    );
  });
  it("should get color as per the consumption progress", () => {
    expect(getProgressColor(20, 100, nutrientColors)).toEqual(
      nutrientColors.Green
    );
    expect(getProgressColor(40, 50, nutrientColors)).toEqual(
      nutrientColors.Green
    );
    expect(getProgressColor(45, 50, nutrientColors)).toEqual(
      nutrientColors.Yellow
    );
    expect(getProgressColor(50, 50, nutrientColors)).toEqual(
      nutrientColors.Yellow
    );
    expect(getProgressColor(51, 50, nutrientColors)).toEqual(
      nutrientColors.Red
    );
  });
});
