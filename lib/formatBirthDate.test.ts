import { describe, it, expect } from "vitest";
import {
  formatBirthDate,
  toBirthDateDigits,
  isValidBirthDate,
} from "./formatBirthDate";

describe("formatBirthDate", () => {
  it("4자리 이하면 숫자만 반환", () => {
    expect(formatBirthDate("1995")).toBe("1995");
  });
  it("6자리면 년월 포맷", () => {
    expect(formatBirthDate("199501")).toBe("1995년 01월");
  });
  it("8자리면 년월일 포맷", () => {
    expect(formatBirthDate("19950101")).toBe("1995년 01월 01일");
  });
  it("하이픈/공백 제거 후 포맷", () => {
    expect(formatBirthDate("1995-01-01")).toBe("1995년 01월 01일");
  });
});

describe("toBirthDateDigits", () => {
  it("숫자만 추출", () => {
    expect(toBirthDateDigits("1995년 01월 01일")).toBe("19950101");
  });
  it("8자리 초과 시 8자리만", () => {
    expect(toBirthDateDigits("199501011")).toBe("19950101");
  });
});

describe("isValidBirthDate", () => {
  it("유효한 날짜 통과", () => {
    expect(isValidBirthDate("19950101")).toBe(true);
    expect(isValidBirthDate("20000129")).toBe(true); // 윤년
  });
  it("잘못된 월 거부", () => {
    expect(isValidBirthDate("19951301")).toBe(false);
    expect(isValidBirthDate("19950001")).toBe(false);
  });
  it("잘못된 일 거부", () => {
    expect(isValidBirthDate("19950230")).toBe(false);
    expect(isValidBirthDate("19950431")).toBe(false);
  });
  it("8자리 미만 거부", () => {
    expect(isValidBirthDate("1995010")).toBe(false);
  });
});
