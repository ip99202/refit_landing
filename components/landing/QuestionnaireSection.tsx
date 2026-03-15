import type { Dispatch, SetStateAction } from "react";

type CheckedMap = Record<string, boolean>;

type QuestionnaireSectionProps = {
  selectedQ1: string;
  setSelectedQ1: (value: string) => void;
  checkedQ2: CheckedMap;
  setCheckedQ2: Dispatch<SetStateAction<CheckedMap>>;
  otherTextQ2: string;
  setOtherTextQ2: (value: string) => void;
  checkedQ3: CheckedMap;
  setCheckedQ3: Dispatch<SetStateAction<CheckedMap>>;
};

const RadioOption = ({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) => (
  <button
    type="button"
    className="inline-flex cursor-pointer items-center gap-3 border-none bg-transparent p-0"
    onClick={onSelect}
  >
    <span className="flex w-6 flex-col items-center justify-center p-0.5">
      <span
        className={`relative h-5 w-5 overflow-hidden rounded-[10px] border-[1.75px] border-solid ${
          selected ? "border-[#ff6f13]" : "border-[#d6dde7]"
        }`}
      >
        {selected ? (
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#ff6f13]" />
        ) : null}
      </span>
    </span>
    <div
      className={`w-fit whitespace-nowrap text-base leading-[21.4px] text-[color:var(--colorlabelnormal)] ${
        selected
          ? "[font-family:'Freesentation-6SemiBold',Helvetica] font-semibold"
          : "[font-family:'Freesentation-4Regular',Helvetica] font-normal"
      }`}
    >
      {label}
    </div>
  </button>
);

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
  selectedQ1,
  setSelectedQ1,
  checkedQ2,
  setCheckedQ2,
  otherTextQ2,
  setOtherTextQ2,
  checkedQ3,
  setCheckedQ3,
}: QuestionnaireSectionProps) => {
  const q1Options = ["3개월 이내", "6개월 이내", "1년 이내", "1년 이상", "연애 경험 없음"];
  const q2Options = [
    "연락/소통 문제",
    "상대의 무관심",
    "잦은 다툼",
    "신뢰 문제 (거짓말, 바람 등)",
    "성격차이",
    "기타",
  ];
  const q3Options = ["잘 맞는 성격", "신뢰 / 안정감", "대화 / 소통", "외모 / 매력", "가치관"];

  const toggleQ2 = (option: string) => {
    setCheckedQ2((prev) => ({ ...prev, [option]: !prev[option] }));
  };
  const toggleQ3 = (option: string) => {
    setCheckedQ3((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <section className="-mx-4 bg-white px-4 py-8">
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-lg font-bold text-[#222222]">Q1. 마지막 연애는 언제 끝났나요?</p>
          <div className="inline-flex flex-col items-start gap-2">
            {q1Options.map((option) => (
              <RadioOption
                key={option}
                label={option}
                selected={selectedQ1 === option}
                onSelect={() => setSelectedQ1(option)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-lg font-bold text-[#222222]">Q2. 지난 연애가 끝난 이유는 무엇이었나요?</p>
            <div className="text-sm font-light text-[#666666]">중복선택 가능</div>
          </div>
          <div className="flex flex-col items-start gap-2">
            {q2Options.map((option) =>
              option === "기타" ? (
                <div key={option} className="flex w-full flex-col items-start gap-2">
                  <CheckboxOption
                    label="기타"
                    checked={!!checkedQ2[option]}
                    onToggle={() => toggleQ2(option)}
                  />
                  <div className="w-full pl-8">
                    <div className="flex h-20 flex-col rounded border border-solid border-[color:var(--colorlinenormal)] bg-[color:var(--colorbackgrounddefault)] p-[var(--element-spacing-6)]">
                      <textarea
                        className="h-full w-full resize-none border-0 bg-transparent font-body2-regular text-[length:var(--body2-regular-font-size)] leading-[var(--body2-regular-line-height)] text-[color:var(--colorlabelnormal)] outline-none placeholder:text-[color:var(--colorlabelalternative)]"
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

        <div className="space-y-3">
          <div>
            <p className="text-lg font-bold text-[#222222]">
              Q3. 다음 연애에서 가장 중요하게 생각하는 것은 무엇인가요?
            </p>
            <div className="text-sm font-light text-[#666666]">중복선택 가능</div>
          </div>
          <div className="flex flex-col items-start gap-2">
            {q3Options.map((option) => (
              <CheckboxOption
                key={option}
                label={option}
                checked={!!checkedQ3[option]}
                onToggle={() => toggleQ3(option)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
