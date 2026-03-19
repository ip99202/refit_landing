"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import FormModalTrigger from "./FormModalTrigger";

const benefits = [
  { id: "혜택 01", text: "10만원 상당의 리핏 모든 기능 이용" },
  { id: "혜택 02", text: "연애 성향 분석 기반 매칭 무료 제공" },
  { id: "혜택 03", text: "프리미엄 연애 분석 테스트 & 리포트 제공" },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [viewerCount, setViewerCount] = useState(18);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    setViewerCount(Math.floor(Math.random() * 6) + 15);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add a small threshold to avoid hiding/showing immediately on tiny scrolls
      if (currentScrollY > lastScrollY + 5) {
        setIsVisible(false); // scrolling down
      } else if (currentScrollY < lastScrollY - 5) {
        setIsVisible(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Fixed Floating Badge - placed in a full-screen fixed container to manage max width and container-type */}
      <div className="pointer-events-none fixed inset-0 z-50 mx-auto w-full max-w-[564px] [container-type:inline-size]">
        <div
          className={`pointer-events-auto absolute left-1/2 top-4 inline-flex -translate-x-1/2 whitespace-nowrap rounded-full bg-[#24292db8] px-5 py-2 text-[clamp(15px,2.2cqw,40px)] font-semibold leading-none text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 sm:top-8 sm:px-8 sm:py-3 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0"
          }`}
        >
          현재 {mounted ? viewerCount : 18}명이 보고있어요 👀
        </div>
      </div>

      <main className="relative mx-auto w-full max-w-[564px] min-h-screen bg-[#fffcf9] shadow-[0_0_20px_rgba(0,0,0,0.05)]">
        <section className="relative overflow-hidden px-5 pb-0 pt-10 sm:px-8 sm:pt-14">
        <div className="pointer-events-none absolute -left-24 -top-36 h-[360px] w-[360px] rounded-full bg-[linear-gradient(220deg,rgba(255,228,203,0.24)_0%,rgba(255,255,255,1)_100%)] blur-sm" />
        <div className="pointer-events-none absolute -right-20 top-20 h-[320px] w-[320px] rounded-full bg-[linear-gradient(216deg,rgba(255,228,203,0.65)_0%,rgba(255,255,255,0.7)_100%)] blur-md" />

        <div className="relative mx-auto flex w-full max-w-[564px] flex-col items-center text-center [container-type:inline-size]">
          {/* Invisible placeholder to maintain layout space */}
          <div
            className="pointer-events-none mb-8 inline-flex whitespace-nowrap rounded-full px-5 py-2 text-[clamp(15px,2.2cqw,40px)] font-semibold leading-none opacity-0 sm:mb-12 sm:px-8 sm:py-3"
            aria-hidden="true"
          >
            현재 {mounted ? viewerCount : 18}명이 보고있어요 👀
          </div>

          <h1
            className="text-[clamp(52px,10.8cqw,100px)] font-black leading-[1.05] tracking-[-0.04em] text-[#222222]"
            style={{
              WebkitTextStroke: "clamp(2px,0.55cqw,6px) #fff",
              paintOrder: "stroke fill",
            }}
          >
            <span className="block whitespace-nowrap">
              <span className="text-[#ff6f13]">똥차</span> 같은 연애
            </span>
            <span className="block whitespace-nowrap">
              이제 <span className="text-[#ff6f13]">그만!</span>
              <span aria-hidden className="ml-1 align-middle sm:ml-2">
                🖐
              </span>
            </span>
          </h1>

          <p className="mt-8 text-[clamp(24px,5cqw,44px)] font-medium leading-[1.35] text-[#222222] sm:mt-10">
            <span className="block whitespace-nowrap">전 연애는 그만 떠올리고</span>
            <span className="block whitespace-nowrap">
              이제 <strong className="font-extrabold">나와 맞는 사람</strong>을 만나세요!
            </span>
          </p>

          <p className="mt-8 whitespace-nowrap text-[clamp(21px,5.3cqw,48px)] font-semibold leading-[1.3] tracking-[-0.02em] text-[#222222] sm:mt-12">
            &ldquo;전 연애 기반 소개팅 서비스{" "}
            <span className="font-extrabold text-[#ff6f13]">리핏(re:fit)</span>&rdquo;
          </p>
        </div>

        <div className="relative mx-auto mt-12 flex w-full max-w-[564px] flex-col items-center gap-8 sm:mt-16 sm:gap-12">
          <Image
            src={image1}
            alt="이별 이유 분석 섹션"
            className="h-auto w-full max-w-[564px]"
            priority
          />
          <Image
            src={image2}
            alt="리핏 매칭 방식 설명 섹션"
            className="h-auto w-full max-w-[564px]"
          />
          <Image
            src={image3}
            alt="매칭 프로세스 섹션"
            className="h-auto w-full max-w-[564px]"
          />
        </div>

        <section className="-mx-5 mt-12 overflow-hidden bg-[linear-gradient(180deg,#111111_0%,#4b1d00_100%)] px-5 pb-28 pt-8 text-center text-white sm:-mx-8 sm:mt-16 sm:px-8 sm:pb-32 sm:pt-12">
          <div className="pointer-events-none absolute -left-40 -top-44 h-[520px] w-[520px] rounded-full bg-[linear-gradient(216deg,rgba(255,228,203,0.12)_0%,rgba(236,114,0,0.12)_100%)] blur-[45px]" />

          <div className="relative mx-auto w-full max-w-[564px] [container-type:inline-size]">
            <p className="text-[clamp(12px,1.9cqw,32px)] font-light tracking-[-0.02em] text-[#d9d9d9]">
              ※ 리핏은 6월 초에 오픈 될 예정입니다.
            </p>

            <p className="mt-5 text-[clamp(24px,5.2cqw,64px)] font-normal leading-[1.2] tracking-[-0.03em]">
              지금 <span className="font-bold">사전신청</span> 하는 분들께만 드리는
              <br />
              특별 프로모션!
            </p>

            <p className="mt-4 text-[clamp(44px,10cqw,124px)] font-extrabold leading-[1] tracking-[-0.04em]">
              <span className="text-white">선착순 </span>
              <span className="text-[#ff6f13]">100명</span>
            </p>

            <div className="mx-auto mt-8 w-full max-w-[500px] rounded-2xl border border-[#ffc999] bg-white p-4 text-left sm:mt-10 sm:p-8">
              <div className="flex flex-col gap-3 sm:gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="flex items-center gap-3 sm:gap-4">
                    <div className="shrink-0 rounded-full bg-[#ff7014] px-3 py-1.5 text-[clamp(11px,1.9cqw,22px)] font-bold leading-none text-[#fff4ec] sm:px-5 sm:py-2">
                      {benefit.id}
                    </div>
                    <p className="text-[clamp(13px,2.5cqw,32px)] font-medium leading-[1.25] tracking-[-0.02em] text-[#222222]">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 text-[clamp(20px,6.4cqw,66px)] font-normal leading-[1.16] tracking-[-0.03em] sm:mt-10">
              <span className="font-bold">사전신청</span>을 통해
              <br />
              <span className="font-bold">리핏 오픈</span>을 제일 먼저 받아보세요!🔥
            </p>
          </div>
        </section>
      </section>
      </main>

      <FormModalTrigger />
    </>
  );
}
