import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import DishListItem from "../components/dishListItem";

describe("Edit Dish", () => {
  afterEach(cleanup);
  const dummyObject = { modifyDishQuantity: () => {} };
  it("should render", () => {
    const { getByText } = render(
      <DishListItem
        dishName="Banana"
        modifyDishQuantity={dummyObject.modifyDishQuantity}
        quantity={1}
      />
    );
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("Banana")).toBeInTheDocument();
  });
  it("should decrease the quantity", () => {
    const spy = jest.spyOn(dummyObject, "modifyDishQuantity");
    const { getByAltText } = render(
      <DishListItem
        dishName="Banana"
        modifyDishQuantity={dummyObject.modifyDishQuantity}
        quantity={1}
      />
    );

    fireEvent.click(getByAltText("decrease"));
    expect(spy).toHaveBeenCalledWith("Banana", 0);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it("should increase the quantity", () => {
    const spy = jest.spyOn(dummyObject, "modifyDishQuantity");
    const { getByAltText } = render(
      <DishListItem
        dishName="Banana"
        modifyDishQuantity={dummyObject.modifyDishQuantity}
        quantity={1}
      />
    );

    fireEvent.click(getByAltText("increase"));
    expect(spy).toHaveBeenCalledWith("Banana", 2);
    spy.mockRestore();
  });
});
