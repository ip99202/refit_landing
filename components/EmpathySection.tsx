const TAGS = ["연락 주기", "소비 습관", "감정 표현", "화해 방식"];

export default function EmpathySection() {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
          당신의 이별 이유는 무엇이었나요?
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-base text-gray-600 text-center leading-relaxed">
          결국 헤어짐은 장점보다 더 견딜 수 없는 단점 때문입니다.
        </p>
      </div>
    </section>
  );
}
