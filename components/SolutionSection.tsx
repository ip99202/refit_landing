export default function SolutionSection() {
  return (
    <section className="px-6 py-16 bg-gray-50">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">
          전 연애 기반 소개팅 서비스 &apos;리핏&apos;은
          <br />
          완벽한 사람을 찾지 않습니다.
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">기존 서비스</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 나이</li>
              <li>• 직업</li>
              <li>• 조건</li>
            </ul>
          </div>
          <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
            <h3 className="text-sm font-semibold text-rose-700 mb-3">리핏</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 연락 스타일</li>
              <li>• 감정 표현</li>
              <li>• 갈등 해결 방식</li>
            </ul>
          </div>
        </div>

        <p className="text-base font-semibold text-gray-800 text-center">
          조건보다 실제 연애에 더 중요한 &apos;가치관&apos;이 맞는 사람을 만나보세요!
        </p>
      </div>
    </section>
  );
}
