import React from "react";
import CarouselItems from "../index";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
var items = [
  {
    name: "Random Name #1",
    imageUrl: "/assets/images/dietTracker/diabetesProgram.png",
  },
  {
    name: "Random Name #1",
    imageUrl: "/assets/images/dietTracker/fertilityProgram.png",
  },
  {
    name: "Random Name #1",
    imageUrl: "/assets/images/dietTracker/thyroidProgram.png",
  },
];

describe("Program carousel", () => {
  afterEach(cleanup);

  it("should show first image on render", () => {
    const { queryAllByRole } = render(<CarouselItems itemsArray={items} />);
    expect(queryAllByRole("img").length).toEqual(1);
    expect(queryAllByRole("img")[0].getAttribute("src")).toEqual(
      items[0].imageUrl
    );
  });
});
