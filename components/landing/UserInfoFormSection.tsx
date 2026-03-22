import { useState } from "react";
import { formatPhone, toPhoneDigits } from "@/lib/formatPhone";
import { toBirthDateDigits, padToEightDigits, isValidBirthDate } from "@/lib/formatBirthDate";

type UserInfoFormSectionProps = {
  checkedQ1: Record<string, boolean>;
  otherTextQ1: string;
  checkedQ2: Record<string, boolean>;
  otherTextQ2: string;
};

const formatBirthDateSlash = (value: string) => {
  const digits = toBirthDateDigits(value);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}/${digits.slice(4, 6)}`;
  return `${digits.slice(0, 4)}/${digits.slice(4, 6)}/${digits.slice(6, 8)}`;
};

export const UserInfoFormSection = ({
  checkedQ1,
  otherTextQ1,
  checkedQ2,
  otherTextQ2,
}: UserInfoFormSectionProps) => {
  const [activeField, setActiveField] = useState<"name" | "birthdate" | "phone" | null>(null);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prev = birthdate;
    const newVal = e.target.value;
    const prevDigits = toBirthDateDigits(prev);
    const newDigits = toBirthDateDigits(newVal);

    if (newVal.length < prev.length && newDigits === prevDigits) {
      setBirthdate(formatBirthDateSlash(prevDigits.slice(0, -1)));
    } else {
      setBirthdate(formatBirthDateSlash(newVal));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!Object.values(checkedQ1).some(Boolean)) {
      setMessage({ type: "error", text: "Q1 문항을 1개 이상 선택해주세요." });
      return;
    }
    if (!Object.values(checkedQ2).some(Boolean)) {
      setMessage({ type: "error", text: "Q2 문항을 1개 이상 선택해주세요." });
      return;
    }

    const q1CodeOrder = [
      { key: "연락/소통 문제", code: "a1" },
      { key: "상대의 무관심", code: "a2" },
      { key: "잦은 다툼", code: "a3" },
      { key: "신뢰 문제 (거짓말, 바람 등)", code: "a4" },
      { key: "성격차이", code: "a5" },
      { key: "기타", code: "a6" },
    ];
    const q2CodeOrder = [
      { key: "매칭 상대의 외모/프로필 사진", code: "a1" },
      { key: "나와 잘 맞는 사람을 찾는 매칭 알고리즘", code: "a2" },
      { key: "상대의 진정성 (허위/가짜 계정 여부)", code: "a3" },
      { key: "대화 기능 및 사용 편의성", code: "a4" },
      { key: "가입자 수 등 앱의 규모와 활성도", code: "a5" },
      { key: "안전성 및 개인정보 보호", code: "a6" },
      { key: "유료/무료 기능 및 가격", code: "a7" },
      { key: "기타", code: "a8" },
    ];

    const q1Codes = q1CodeOrder.filter((item) => checkedQ1[item.key]).map((item) => item.code);
    const q2Codes = q2CodeOrder.filter((item) => checkedQ2[item.key]).map((item) => item.code);

    const etc1 = checkedQ1["기타"] && otherTextQ1.trim() ? otherTextQ1.trim() : "";
    const etc2 = checkedQ2["기타"] && otherTextQ2.trim() ? otherTextQ2.trim() : "";

    if (checkedQ1["기타"] && !otherTextQ1.trim()) {
      setMessage({ type: "error", text: "Q1의 기타 사유를 입력해주세요." });
      return;
    }
    if (checkedQ2["기타"] && !otherTextQ2.trim()) {
      setMessage({ type: "error", text: "Q2의 기타 사유를 입력해주세요." });
      return;
    }

    if (!name.trim()) {
      setMessage({ type: "error", text: "이름을 입력해주세요." });
      return;
    }

    const birthDigits = toBirthDateDigits(birthdate);
    const birthNormalized = padToEightDigits(birthDigits);
    if (!birthDigits) {
      setMessage({ type: "error", text: "생년월일을 입력해주세요." });
      return;
    }
    if (!isValidBirthDate(birthNormalized)) {
      setMessage({
        type: "error",
        text: "올바른 생년월일을 입력해주세요. (예: 1995년 11월 15일)",
      });
      return;
    }

    const phoneDigits = toPhoneDigits(phone);
    if (!phoneDigits) {
      setMessage({ type: "error", text: "휴대폰 번호를 입력해주세요." });
      return;
    }
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      setMessage({ type: "error", text: "휴대폰 번호를 올바르게 입력해주세요." });
      return;
    }

    const genderKo = gender === "male" ? "남" : "여";

    setLoading(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          birthDate: birthdate,
          phone,
          gender: genderKo,
          q1: q1Codes.join(","),
          q2: q2Codes.join(","),
          etc1,
          etc2,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({
          type: "error",
          text: data.error ?? "신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
        return;
      }

      setMessage({ type: "success", text: "신청이 완료되었습니다! 감사합니다." });
      setName("");
      setBirthdate("");
      setPhone("");
      setGender("male");
    } catch {
      setMessage({
        type: "error",
        text: "신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full space-y-6">
      <div className="space-y-2">
        <div className="text-[18px] font-bold leading-[1.25] tracking-[-0.02em] text-[#222222]">
          거의 완료됐어요!
          <br />
          마지막으로 정보를 입력해주세요
        </div>

        <p className="text-[14px] leading-[1.4] text-[#4a4a4a]">
          질문은 두 문항이며, 30초 이내에 완료됩니다.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div
          className={`w-full rounded-[10px] bg-white ${activeField === "name" ? "border border-[#ff6f13]" : "border border-[#dae3ee]"
            }`}
        >
          <div className="flex h-[64px] items-center px-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setActiveField("name")}
              onBlur={() => setActiveField(null)}
              placeholder="이름"
              className="w-full border-none bg-transparent text-[16px] leading-none text-[#111827] outline-none placeholder:text-[#7c8796]"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setName("")}
              disabled={loading || !name}
              aria-label="이름 지우기"
              className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#edf1f5] text-[11px] text-[#a5afbb] disabled:opacity-40"
            >
              ×
            </button>
          </div>
        </div>

        <div
          className={`w-full rounded-[10px] bg-white ${activeField === "birthdate" ? "border border-[#ff6f13]" : "border border-[#dae3ee]"
            }`}
        >
          <div className="px-4 pb-3 pt-2">
            <div
              className={`text-[12px] leading-none ${activeField === "birthdate" ? "text-[#ff6f13]" : "text-[#7c8796]"
                }`}
            >
              생년월일
            </div>

            <div className="mt-1 flex items-center gap-2">
              <input
                type="text"
                value={birthdate}
                onChange={handleBirthDateChange}
                onFocus={() => setActiveField("birthdate")}
                onBlur={() => setActiveField(null)}
                placeholder="예) 19990320"
                className="h-7 flex-1 border-none bg-transparent text-[16px] leading-none text-[#111827] outline-none placeholder:text-[#7c8796]"
                disabled={loading}
              />

              <button
                type="button"
                onClick={() => setBirthdate("")}
                disabled={loading || !birthdate}
                aria-label="생년월일 지우기"
                className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#edf1f5] text-[11px] text-[#a5afbb] disabled:opacity-40"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div
          className={`w-full rounded-[10px] bg-white ${activeField === "phone" ? "border border-[#ff6f13]" : "border border-[#dae3ee]"
            }`}
        >
          <div className="flex h-[64px] items-center px-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              onFocus={() => setActiveField("phone")}
              onBlur={() => setActiveField(null)}
              placeholder="휴대폰번호"
              className="w-full border-none bg-transparent text-[16px] leading-none text-[#111827] outline-none placeholder:text-[#7c8796]"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setPhone("")}
              disabled={loading || !phone}
              aria-label="휴대폰번호 지우기"
              className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#edf1f5] text-[11px] text-[#a5afbb] disabled:opacity-40"
            >
              ×
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[16px] font-normal leading-none text-[#222222]">성별</div>

          <div className="inline-flex items-center gap-7">
            <button
              type="button"
              onClick={() => setGender("male")}
              className="inline-flex cursor-pointer items-center gap-2.5 border-none bg-transparent p-0"
              disabled={loading}
            >
              <div className="flex w-6 flex-col items-center justify-center p-0.5">
                <div
                  className={`relative h-5 w-5 overflow-hidden rounded-[10px] border-[1.75px] border-solid ${gender === "male" ? "border-[#ff6f13]" : "border-[#cfd8e3]"
                    }`}
                >
                  {gender === "male" ? (
                    <div className="absolute left-[calc(50%-6px)] top-[calc(50%-6px)] h-3 w-3 rounded-md bg-[#ff6f13]" />
                  ) : (
                    <div className="relative left-[calc(50%-6px)] top-[calc(50%-6px)] h-3 w-3 rounded-md bg-white" />
                  )}
                </div>
              </div>

              <div
                className={`text-[16px] leading-none text-[#222222] ${gender === "male" ? "font-semibold" : "font-normal"}`}
              >
                남자
              </div>
            </button>

            <button
              type="button"
              onClick={() => setGender("female")}
              className="inline-flex cursor-pointer items-center gap-2.5 border-none bg-transparent p-0"
              disabled={loading}
            >
              <div className="flex w-6 flex-col items-center justify-center p-0.5">
                <div
                  className={`relative h-5 w-5 overflow-hidden rounded-[10px] border-[1.75px] border-solid ${gender === "female" ? "border-[#ff6f13]" : "border-[#cfd8e3]"
                    }`}
                >
                  {gender === "female" ? (
                    <div className="absolute left-[calc(50%-6px)] top-[calc(50%-6px)] h-3 w-3 rounded-md bg-[#ff6f13]" />
                  ) : (
                    <div className="relative left-[calc(50%-6px)] top-[calc(50%-6px)] h-3 w-3 rounded-md bg-white" />
                  )}
                </div>
              </div>

              <div
                className={`text-[16px] leading-none text-[#222222] ${gender === "female" ? "font-semibold" : "font-normal"}`}
              >
                여자
              </div>
            </button>
          </div>
        </div>
        {message ? (
          <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-[14px] bg-[#1f252b] py-4 text-[16px] font-semibold leading-none text-white disabled:opacity-60"
        >
          {loading ? "처리 중..." : "무료 체험 신청하기"}
        </button>
      </form>
    </section>
  );
};
