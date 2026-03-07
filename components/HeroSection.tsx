"use client";

export default function HeroSection() {
  const scrollToForm = () => {
    document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center px-6 py-16 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-md mx-auto w-full text-center">
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-gray-900 mb-4">
          전 애인은 잊고,
          <br />
          이제 나와 맞는 사람을 만나세요.
        </h1>
        <p className="text-lg font-semibold text-rose-600 mb-8">
          똥차 같은 연애, 이제 그만 ✋
        </p>

        <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-rose-100">
          <p className="text-sm text-gray-600 mb-1">현재 34 / 100 신청 완료</p>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full transition-all"
              style={{ width: "34%" }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">선착순 100명 베타 모집</p>
        </div>

        <button
          onClick={scrollToForm}
          className="w-full min-h-[48px] py-3 px-6 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl transition-colors touch-manipulation"
        >
          사전 신청하기
        </button>
      </div>
    </section>
  );
}
