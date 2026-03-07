import { describe, it, expect } from "vitest";
import { formatPhone, toPhoneDigits } from "./formatPhone";

describe("formatPhone", () => {
  it("3자리 이하면 그대로 반환", () => {
    expect(formatPhone("010")).toBe("010");
    expect(formatPhone("01")).toBe("01");
  });

  it("4~7자리면 첫 하이픈 삽입", () => {
    expect(formatPhone("0101")).toBe("010-1");
    expect(formatPhone("0101234")).toBe("010-1234");
  });

  it("8자리 이상이면 010-1234-5678 형식", () => {
    expect(formatPhone("01012345678")).toBe("010-1234-5678");
    expect(formatPhone("01012341234")).toBe("010-1234-1234");
  });

  it("하이픈 포함 입력도 정규화", () => {
    expect(formatPhone("010-1234-5678")).toBe("010-1234-5678");
  });

  it("11자리 초과 시 잘림", () => {
    expect(formatPhone("010123456789")).toBe("010-1234-5678");
  });
});

describe("toPhoneDigits", () => {
  it("하이픈 제거 후 숫자만 반환", () => {
    expect(toPhoneDigits("010-1234-5678")).toBe("01012345678");
    expect(toPhoneDigits("010-1234-1234")).toBe("01012341234");
  });
});
