import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";

const mockInsert = vi.fn();

vi.mock("@/lib/supabase", () => ({
  createClient: () => ({
    from: () => ({
      insert: mockInsert,
    }),
  }),
}));

const validBody = {
  name: "홍길동",
  birthDate: "1995년 11월 15일",
  phone: "010-1234-5678",
  gender: "남",
  q1: "a1",
  q2: "a3,a6",
  q3: "a2",
  etc: "가끔 의견 충돌",
};

async function callApi(body: object) {
  const req = new Request("http://localhost/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return POST(req);
}

describe("POST /api/apply", () => {
  beforeEach(() => {
    mockInsert.mockResolvedValue({ error: null });
    // DISCORD_WEBHOOK_URL 미설정 시 알림 건너뜀
  });

  it("이름 없으면 400", async () => {
    const res = await callApi({ ...validBody, name: "" });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("이름을 입력해주세요.");
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("생년월일 없으면 400", async () => {
    const res = await callApi({ ...validBody, birthDate: "" });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("생년월일을 입력해주세요.");
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("잘못된 생년월일이면 400", async () => {
    const res = await callApi({ ...validBody, birthDate: "1995년 99월 01일" });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("올바른 생년월일");
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("휴대폰 없으면 400", async () => {
    const res = await callApi({ ...validBody, phone: "" });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("휴대폰 번호를 입력해주세요.");
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("휴대폰 자릿수 부족하면 400", async () => {
    const res = await callApi({ ...validBody, phone: "010-123-456" }); // 9자리
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("휴대폰 번호를 올바르게 입력해주세요.");
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("성별 없으면 400", async () => {
    const res = await callApi({ ...validBody, gender: "기타" });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("성별을 선택해주세요.");
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("유효한 요청이면 insert 후 200", async () => {
    const res = await callApi(validBody);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);

    expect(mockInsert).toHaveBeenCalledWith({
      name: "홍길동",
      birth_date: "19951115",
      phone: "01012345678",
      gender: "남",
      q1: "a1",
      q2: "a3,a6",
      q3: "a2",
      etc: "가끔 의견 충돌",
    });
  });

  it("중복 휴대폰(23505)이면 409", async () => {
    mockInsert.mockResolvedValueOnce({ error: { code: "23505" } });

    const res = await callApi(validBody);
    expect(res.status).toBe(409);
    const data = await res.json();
    expect(data.error).toBe("이미 신청하셨습니다.");
  });
});
