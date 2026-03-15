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
  const [selectedQ1, setSelectedQ1] = useState("");
  const [checkedQ2, setCheckedQ2] = useState<Record<string, boolean>>({
    "연락/소통 문제": false,
    "상대의 무관심": false,
    "잦은 다툼": false,
    "신뢰 문제 (거짓말, 바람 등)": false,
    성격차이: false,
    기타: false,
  });
  const [otherTextQ2, setOtherTextQ2] = useState("");
  const [checkedQ3, setCheckedQ3] = useState<Record<string, boolean>>({
    "잘 맞는 성격": false,
    "신뢰 / 안정감": false,
    "대화 / 소통": false,
    "외모 / 매력": false,
    가치관: false,
  });

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
      <div className="fixed inset-x-0 bottom-0 z-50 px-5 pb-[calc(env(safe-area-inset-bottom)+12px)] sm:px-8">
        <div className="mx-auto w-full max-w-[820px]">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full rounded-2xl bg-[#ff7014] px-4 py-4 text-[clamp(22px,4.8vw,60px)] font-bold leading-none text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] sm:py-6"
          >
            리핏 더 알아보기
          </button>
        </div>
      </div>

      {open ? (
        <FormModal onClose={() => setOpen(false)}>
          <OfferDetailsSection />
          <QuestionnaireSection
            selectedQ1={selectedQ1}
            setSelectedQ1={setSelectedQ1}
            checkedQ2={checkedQ2}
            setCheckedQ2={setCheckedQ2}
            otherTextQ2={otherTextQ2}
            setOtherTextQ2={setOtherTextQ2}
            checkedQ3={checkedQ3}
            setCheckedQ3={setCheckedQ3}
          />
          <UserInfoFormSection
            selectedQ1={selectedQ1}
            checkedQ2={checkedQ2}
            checkedQ3={checkedQ3}
            otherTextQ2={otherTextQ2}
          />
        </FormModal>
      ) : null}
    </>
  );
}
