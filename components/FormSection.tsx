"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import type { ApplicationForm } from "@/types/application";

export default function FormSection() {
  const [form, setForm] = useState<ApplicationForm>({
    name: "",
    birthDate: "",
    phone: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 8);
    setForm((f) => ({ ...f, birthDate: v }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, phone: formatPhone(e.target.value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!form.name.trim()) {
      setMessage({ type: "error", text: "이름을 입력해주세요." });
      return;
    }
    if (!form.birthDate.trim()) {
      setMessage({ type: "error", text: "생년월일을 입력해주세요." });
      return;
    }
    if (!/^\d{8}$/.test(form.birthDate.replace(/-/g, ""))) {
      setMessage({ type: "error", text: "생년월일은 8자리(YYYYMMDD)로 입력해주세요." });
      return;
    }
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      setMessage({ type: "error", text: "휴대폰 번호를 입력해주세요." });
      return;
    }
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      setMessage({ type: "error", text: "휴대폰 번호를 올바르게 입력해주세요." });
      return;
    }
    if (!["남", "여"].includes(form.gender)) {
      setMessage({ type: "error", text: "성별을 선택해주세요." });
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("applications").insert({
        name: form.name.trim(),
        birth_date: form.birthDate.replace(/-/g, ""),
        phone: form.phone.replace(/\D/g, ""),
        gender: form.gender,
      });

      if (error) throw error;

      setMessage({ type: "success", text: "신청이 완료되었습니다! 감사합니다." });
      setForm({ name: "", birthDate: "", phone: "", gender: "" });
    } catch (err) {
      setMessage({
        type: "error",
        text: "신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="form-section" className="px-6 py-16 bg-rose-50">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
          프로모션 안내 & 신청
        </h2>

        <p className="text-sm text-gray-600 mb-2">
          ※ 리핏은 6월 초에 오픈될 예정입니다.
        </p>
        <div className="p-4 bg-white rounded-xl shadow-sm border border-rose-100 mb-8">
          <h3 className="font-semibold text-gray-900 mb-2">오픈 기념 프로모션 (선착순 100명)</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 출시 후 매칭 서비스 14일간 무료</li>
            <li>• 분석 리포트 제공 & 리포트 기반 연애 컨설팅 진행</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              👤 이름
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              placeholder="이름"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
              🎂 생년월일
            </label>
            <input
              id="birthDate"
              type="text"
              inputMode="numeric"
              value={form.birthDate}
              onChange={handleBirthDateChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              placeholder="19950101"
              maxLength={8}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              📱 휴대폰 번호
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              value={form.phone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              placeholder="010-1234-5678"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">🚻 성별</label>
            <div className="flex gap-4">
              {(["남", "여"] as const).map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={form.gender === g}
                    onChange={() => setForm((f) => ({ ...f, gender: g }))}
                    disabled={loading}
                    className="w-4 h-4 text-rose-500"
                  />
                  <span className="text-sm">{g}</span>
                </label>
              ))}
            </div>
          </div>

          {message && (
            <p
              className={`text-sm ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[48px] py-3 px-6 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-semibold rounded-xl transition-colors touch-manipulation"
          >
            {loading ? "처리 중..." : "프로모션 신청하기"}
          </button>
        </form>
      </div>
    </section>
  );
}
