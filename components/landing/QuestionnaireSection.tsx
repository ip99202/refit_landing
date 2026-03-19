import type { Dispatch, SetStateAction } from "react";

type CheckedMap = Record<string, boolean>;

type QuestionnaireSectionProps = {
  checkedQ1: CheckedMap;
  setCheckedQ1: Dispatch<SetStateAction<CheckedMap>>;
  otherTextQ1: string;
  setOtherTextQ1: (value: string) => void;
  checkedQ2: CheckedMap;
  setCheckedQ2: Dispatch<SetStateAction<CheckedMap>>;
  otherTextQ2: string;
  setOtherTextQ2: (value: string) => void;
};

const CheckboxOption = ({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) => (
  <button
    type="button"
    className="inline-flex cursor-pointer items-center gap-3 border-none bg-transparent p-0"
    onClick={onToggle}
  >
    <span className="flex w-6 flex-col items-center justify-center p-0.5">
      {checked ? (
        <span className="relative flex h-5 w-5 aspect-[1] items-center justify-center rounded-[5px] border-[1.5px] border-solid border-[#ff6f13] bg-[#ff6f13]">
          <svg
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4L4.5 7.5L11 1"
              stroke="white"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : (
        <span className="relative h-5 w-5 aspect-[1] rounded-[5px] border-[1.5px] border-solid border-[#d6dde7]" />
      )}
    </span>
    <div
      className={`w-fit whitespace-nowrap text-base leading-[21.4px] text-[color:var(--colorlabelnormal)] ${
        checked
          ? "[font-family:'Freesentation-6SemiBold',Helvetica] font-semibold"
          : "[font-family:'Freesentation-4Regular',Helvetica] font-normal"
      }`}
    >
      {label}
    </div>
  </button>
);

export const QuestionnaireSection = ({
  checkedQ1,
  setCheckedQ1,
  otherTextQ1,
  setOtherTextQ1,
  checkedQ2,
  setCheckedQ2,
  otherTextQ2,
  setOtherTextQ2,
}: QuestionnaireSectionProps) => {
  const q1Options = [
    "연락/소통 문제",
    "상대의 무관심",
    "잦은 다툼",
    "신뢰 문제 (거짓말, 바람 등)",
    "성격차이",
    "기타",
  ];
  const q2Options = [
    "매칭 상대의 외모/프로필 사진",
    "나와 잘 맞는 사람을 찾는 매칭 알고리즘",
    "상대의 진정성 (허위/가짜 계정 여부)",
    "대화 기능 및 사용 편의성",
    "가입자 수 등 앱의 규모와 활성도",
    "안전성 및 개인정보 보호",
    "유료/무료 기능 및 가격",
    "기타",
  ];

  const toggleQ1 = (option: string) => {
    setCheckedQ1((prev) => ({ ...prev, [option]: !prev[option] }));
  };
  const toggleQ2 = (option: string) => {
    setCheckedQ2((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <section className="-mx-4 bg-white px-4 py-8">
      <div className="space-y-8">
        <div className="space-y-3">
          <div>
            <p className="text-[17px] font-bold text-[#222222]">Q1. 지난 연애가 끝난 이유는 무엇이었나요?</p>
            <div className="mt-1 text-sm font-light text-[#888888]">중복선택 가능</div>
          </div>
          <div className="flex flex-col items-start gap-2 pt-1">
            {q1Options.map((option) =>
              option === "기타" ? (
                <div key={option} className="flex w-full flex-col items-start gap-2">
                  <CheckboxOption
                    label="기타"
                    checked={!!checkedQ1[option]}
                    onToggle={() => toggleQ1(option)}
                  />
                  <div className="w-full pl-8">
                    <div className="flex flex-col rounded border border-solid border-[color:var(--colorlinenormal)] bg-[color:var(--colorbackgrounddefault)] p-[var(--element-spacing-6)]">
                      <textarea
                        className="h-[60px] w-full resize-none border-0 bg-transparent font-body2-regular text-[15px] leading-[1.4] text-[#222222] outline-none placeholder:text-[#a0a0a0]"
                        placeholder="기타 사유를 입력해주세요"
                        value={otherTextQ1}
                        onChange={(e) => setOtherTextQ1(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <CheckboxOption
                  key={option}
                  label={option}
                  checked={!!checkedQ1[option]}
                  onToggle={() => toggleQ1(option)}
                />
              ),
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-[17px] font-bold text-[#222222] leading-[1.35]">
              Q2. 소개팅어플에서 가장 중요하게 생각하는 부분이 무엇인가요?
            </p>
            <div className="mt-1 text-sm font-light text-[#888888]">중복선택 가능</div>
          </div>
          <div className="flex flex-col items-start gap-2 pt-1">
            {q2Options.map((option) =>
              option === "기타" ? (
                <div key={option} className="flex w-full flex-col items-start gap-2">
                  <CheckboxOption
                    label="기타"
                    checked={!!checkedQ2[option]}
                    onToggle={() => toggleQ2(option)}
                  />
                  <div className="w-full pl-8">
                    <div className="flex flex-col rounded border border-solid border-[color:var(--colorlinenormal)] bg-[color:var(--colorbackgrounddefault)] p-[var(--element-spacing-6)]">
                      <textarea
                        className="h-[60px] w-full resize-none border-0 bg-transparent font-body2-regular text-[15px] leading-[1.4] text-[#222222] outline-none placeholder:text-[#a0a0a0]"
                        placeholder="기타 사유를 입력해주세요"
                        value={otherTextQ2}
                        onChange={(e) => setOtherTextQ2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <CheckboxOption
                  key={option}
                  label={option}
                  checked={!!checkedQ2[option]}
                  onToggle={() => toggleQ2(option)}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
