import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
  generateArrayOfRelativeDates,
  generateArrayOfFutureDates,
  generateRelativeDatesGivenCurrentDate,
  checkIfDateIsLessThanOrEqualTo15thJune,
  checkIsAppHeaderVisibleForPath,
  youTubeGetID,
} from "../utils/Utility";

describe("Diet tracker", () => {
  afterEach(cleanup);

  it.only("should generate relative date", () => {
    const alpha = generateRelativeDatesGivenCurrentDate("2022-06-07", 0);
    expect(alpha.getDate()).toEqual(7);
    /** js date month starts from zero */
    expect(alpha.getMonth() + 1).toEqual(6);
    expect(alpha.getFullYear()).toEqual(2022);
    const beta = generateRelativeDatesGivenCurrentDate("2022-06-07", 2);
    expect(beta.getDate()).toEqual(9);
    expect(beta.getMonth() + 1).toEqual(6);
    expect(beta.getFullYear()).toEqual(2022);
    const gamma = generateRelativeDatesGivenCurrentDate("2022-06-07", -3);
    expect(gamma.getDate()).toEqual(4);
    expect(gamma.getMonth() + 1).toEqual(6);
    expect(gamma.getFullYear()).toEqual(2022);
  });

  it.only("should generate array of dates depending on given date", () => {
    const result = generateArrayOfFutureDates("2022-06-07", 5);
    expect(result[0].day).toEqual("Tue");
    expect(result[0].date).toEqual("7");
    expect(result[0].fullDate).toEqual("2022-06-07");
    expect(result[1].day).toEqual("Wed");
    expect(result[1].date).toEqual("8");
    expect(result[1].fullDate).toEqual("2022-06-08");
    expect(result[2].day).toEqual("Thu");
    expect(result[2].date).toEqual("9");
    expect(result[2].fullDate).toEqual("2022-06-09");
    expect(result[3].day).toEqual("Fri");
    expect(result[3].date).toEqual("10");
    expect(result[3].fullDate).toEqual("2022-06-10");
    expect(result[4].day).toEqual("Sat");
    expect(result[4].date).toEqual("11");
    expect(result[4].fullDate).toEqual("2022-06-11");
  });

  it.only("should compare date with 15th June", () => {
    const result = checkIfDateIsLessThanOrEqualTo15thJune("2022-06-07");
    expect(result).toEqual(true);
    expect(checkIfDateIsLessThanOrEqualTo15thJune("2022-06-16")).toEqual(false);
    expect(checkIfDateIsLessThanOrEqualTo15thJune("2022-06-15")).toEqual(true);
    expect(checkIfDateIsLessThanOrEqualTo15thJune("2022-06-18")).toEqual(false);
  });

  it.only("should check if app header is visible for current url", () => {
    expect(checkIsAppHeaderVisibleForPath("/user/heath-score/start")).toEqual(
      true
    );
    expect(checkIsAppHeaderVisibleForPath("/user/login")).toEqual(false);
    expect(checkIsAppHeaderVisibleForPath("/user/mobileVerification")).toEqual(
      false
    );
    expect(checkIsAppHeaderVisibleForPath("/user/diet-tracker")).toEqual(true);
    expect(checkIsAppHeaderVisibleForPath("/")).toEqual(true);
  });

  it.only("should extract video id from youtube video url", () => {
    expect(youTubeGetID("https://www.youtube.com/watch?v=Ic6Xjm0w4BU")).toEqual(
      "Ic6Xjm0w4BU"
    );
    expect(youTubeGetID("https://youtu.be/Ic6Xjm0w4BU")).toEqual("Ic6Xjm0w4BU");
  });

  it.only("should generate array of past and future days", () => {
    const result = generateArrayOfRelativeDates("2022-06-21", 2);
    expect(result[0].day).toEqual("Sun");
    expect(result[0].date).toEqual("19");
    expect(result[0].fullDate).toEqual("2022-06-19");
    expect(result[1].day).toEqual("Mon");
    expect(result[1].date).toEqual("20");
    expect(result[1].fullDate).toEqual("2022-06-20");
    expect(result[2].day).toEqual("Tue");
    expect(result[2].date).toEqual("21");
    expect(result[2].fullDate).toEqual("2022-06-21");
    expect(result[3].day).toEqual("Wed");
    expect(result[3].date).toEqual("22");
    expect(result[3].fullDate).toEqual("2022-06-22");
    expect(result[4].day).toEqual("Thu");
    expect(result[4].date).toEqual("23");
    expect(result[4].fullDate).toEqual("2022-06-23");
    expect(result[9]).toEqual(undefined);
  });
});
