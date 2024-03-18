import React from "react";
import GoodForItem from "../index";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import sinon from "sinon";

describe("Add dish", () => {
  afterEach(cleanup);

  it("should render correctly", () => {
    const { getByText } = render(
      <GoodForItem noOfItems={5} imageUrl={"image-link"} diseaseName={"PCOS"} />
    );
    expect(getByText(/PCOS/i)).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
  });

  it("should warn if required props are not provided", () => {
    let stub;
    stub = sinon.stub(console, "error");
    render(<GoodForItem noOfItems={5} imageUrl={5} diseaseName={"PCOS"} />);
    expect(stub.calledOnce).toEqual(true);
    console.log(stub.getCall(0).args);
    expect(stub.getCall(0).args[0]).toMatch(
      /Invalid prop `imageUrl` of type `number`/
    );
  });
});
