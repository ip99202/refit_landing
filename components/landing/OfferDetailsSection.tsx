const benefits = [
  { id: "혜택 01", text: "10만원 상당의 리핏 모든 기능 이용" },
  { id: "혜택 02", text: "연애 성향 분석 기반 매칭 무료 제공" },
  { id: "혜택 03", text: "프리미엄 연애 분석 테스트 & 리포트 제공" },
];

export const OfferDetailsSection = () => {
  return (
    <section className="w-full">
      <h3 className="text-[28px] font-bold leading-[1.08] tracking-[-0.03em] text-[#222222]">
        전 연애 분석 받고
        <br />
        나랑 맞는 사람 찾자! <span className="text-[#ff6f13]">리핏</span>
      </h3>
      <p className="mt-2 text-[14px] text-[#6a6a6a]">
        질문은 두 문항이며, 30초 이내에 완료됩니다.
      </p>

      <div className="mt-3 rounded-lg border border-[#ffd8b7] bg-white p-[clamp(10px,2.8vw,12px)]">
        <div className="space-y-[clamp(6px,1.8vw,8px)]">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex items-center gap-[clamp(6px,1.8vw,8px)]">
              <span className="shrink-0 rounded-full bg-[#ff6f13] px-[clamp(7px,2vw,10px)] py-[clamp(3px,1vw,4px)] text-[clamp(11.5px,3vw,13.5px)] font-bold leading-none text-white">
                {benefit.id}
              </span>
              <span className="min-w-0 text-[clamp(12.5px,3.6vw,15.5px)] font-semibold leading-tight tracking-[-0.01em] text-[#222222]">
                {benefit.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 space-y-1 text-[12px] font-medium text-[#606060]">
        <p>※ 정식 서비스는 6월 10일 오픈 예정입니다.</p>
        <p>※ 문자 및 카톡으로 안내 결과를 보내드립니다.</p>
      </div>
    </section>
  );
};
