import formatGBP from "./FormatGBP";
import { describe, it, expect } from "vitest";

describe("formatGBP", () => {
  it("formats 100 pence to £1.00", () => {
    expect(formatGBP(100)).toEqual("£1.00");
  });

  it("formats 50 pence to £0.50", () => {
    expect(formatGBP(50)).toEqual("£0.50");
  });

  it("formats 235 pence to £2.35", () => {
    expect(formatGBP(235)).toEqual("£2.35");
  });
});
