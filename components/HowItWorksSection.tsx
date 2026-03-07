const STEPS = [
  {
    step: 1,
    title: "이전 연애 경험 작성",
    desc: "매칭 전, 이전 연애 경험을 설문으로 작성해주세요.",
    placeholder: "설문 UI",
  },
  {
    step: 2,
    title: "연애 패턴 진단",
    desc: "200명의 연애 데이터를 분석한 자체 알고리즘으로 연애 패턴을 진단합니다.",
    placeholder: "분석/점수 UI",
  },
  {
    step: 3,
    title: "매칭 성공",
    desc: "서로 간의 프로필 확인 후, 가장 잘 맞는 사람과 매칭 성공!",
    placeholder: "매칭 UI",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-10 text-center">
          서비스 이용 방법
        </h2>

        <div className="space-y-8">
          {STEPS.map(({ step, title, desc, placeholder }) => (
            <div key={step} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center">
                {step}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-4">{desc}</p>
                <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                  {placeholder} 이미지
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
