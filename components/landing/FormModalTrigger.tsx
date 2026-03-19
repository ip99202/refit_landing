"use client";

import { type ReactNode, useEffect, useState } from "react";
import { OfferDetailsSection } from "./OfferDetailsSection";
import { QuestionnaireSection } from "./QuestionnaireSection";
import { UserInfoFormSection } from "./UserInfoFormSection";

const FormModal = ({ onClose, children }: { onClose: () => void; children: ReactNode }) => {
  return (
    <div className="fixed inset-0 z-[70] bg-black/55 p-2 sm:p-5" onClick={onClose}>
      <div
        className="mx-auto h-full w-full max-w-[430px] overflow-hidden rounded-2xl bg-[#fff8ee] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full overflow-y-auto px-4 pb-6 pt-5">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              aria-label="모달 닫기"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edf1f5] text-lg leading-none text-[#7d8794]"
            >
              ×
            </button>
          </div>
          <div className="space-y-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default function FormModalTrigger() {
  const [open, setOpen] = useState(false);
  const [checkedQ1, setCheckedQ1] = useState<Record<string, boolean>>({
    "연락/소통 문제": false,
    "상대의 무관심": false,
    "잦은 다툼": false,
    "신뢰 문제 (거짓말, 바람 등)": false,
    성격차이: false,
    기타: false,
  });
  const [otherTextQ1, setOtherTextQ1] = useState("");
  const [checkedQ2, setCheckedQ2] = useState<Record<string, boolean>>({
    "매칭 상대의 외모/프로필 사진": false,
    "나와 잘 맞는 사람을 찾는 매칭 알고리즘": false,
    "상대의 진정성 (허위/가짜 계정 여부)": false,
    "대화 기능 및 사용 편의성": false,
    "가입자 수 등 앱의 규모와 활성도": false,
    "안전성 및 개인정보 보호": false,
    "유료/무료 기능 및 가격": false,
    기타: false,
  });
  const [otherTextQ2, setOtherTextQ2] = useState("");

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <div className="pointer-events-auto w-full max-w-[564px] px-5 sm:px-8 [container-type:inline-size]">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full rounded-2xl bg-[#ff7014] px-4 py-4 text-[clamp(22px,4.8cqw,60px)] font-bold leading-none text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-200 hover:bg-white hover:text-[#ff7014] hover:ring-2 hover:ring-inset hover:ring-[#ff7014] active:bg-white active:text-[#ff7014] active:ring-2 active:ring-inset active:ring-[#ff7014] sm:py-6"
          >
            연애 성사까지 혜택 보장받기
          </button>
        </div>
      </div>

      {open ? (
        <FormModal onClose={() => setOpen(false)}>
          <OfferDetailsSection />
          <QuestionnaireSection
            checkedQ1={checkedQ1}
            setCheckedQ1={setCheckedQ1}
            otherTextQ1={otherTextQ1}
            setOtherTextQ1={setOtherTextQ1}
            checkedQ2={checkedQ2}
            setCheckedQ2={setCheckedQ2}
            otherTextQ2={otherTextQ2}
            setOtherTextQ2={setOtherTextQ2}
          />
          <UserInfoFormSection
            checkedQ1={checkedQ1}
            checkedQ2={checkedQ2}
            otherTextQ1={otherTextQ1}
            otherTextQ2={otherTextQ2}
          />
        </FormModal>
      ) : null}
    </>
  );
}
