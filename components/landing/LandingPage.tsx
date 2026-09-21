"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import footer from "./assets/Footer.png";
import FormModalTrigger from "./FormModalTrigger";


export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [viewerCount, setViewerCount] = useState(18);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
          className={`pointer-events-auto absolute left-1/2 top-4 inline-flex -translate-x-1/2 whitespace-nowrap rounded-full bg-[#e8e4e0] px-6 py-3 text-[clamp(15px,3cqw,42px)] font-semibold leading-none text-[#444444] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 sm:top-8 sm:px-10 sm:py-4 ${
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
            className="pointer-events-none mb-8 inline-flex whitespace-nowrap rounded-full px-6 py-3 text-[clamp(15px,3cqw,42px)] font-semibold leading-none opacity-0 sm:mb-12 sm:px-10 sm:py-4"
            aria-hidden="true"
          >
            현재 {mounted ? viewerCount : 18}명이 보고있어요 👀
          </div>

          <h1
            className="font-['Paperlogy'] text-[clamp(54px,14cqw,120px)] font-black leading-[1.1] tracking-[-0.02em] text-[#222222]"
          >
            <span className="block whitespace-nowrap">
              <span className="text-[#ff6f13]">똥차</span> 같은 연애
            </span>
            <span className="block whitespace-nowrap">
              이제 <span className="text-[#ff6f13]">그만!</span>🖐
            </span>
          </h1>

          <p className="mt-6 text-[clamp(19px,5.2cqw,48px)] font-medium leading-[1.5] text-[#222222] sm:mt-10">
            <span className="block">전 연애는 그만 떠올리고</span>
            <span className="block">이제 <strong>나와 맞는 사람</strong>을 만나세요!</span>
          </p>

          <p className="mt-6 text-[clamp(18px,4.8cqw,44px)] font-semibold leading-[1.5] text-[#222222] sm:mt-8">
            &ldquo;전 연애 기반 소개팅 서비스 <span className="text-[#ff6f13]">리핏(re:fit)</span>&rdquo;
          </p>
        </div>

        <div className="relative mx-auto mt-12 flex w-full max-w-[564px] flex-col items-center sm:mt-16">
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
            loading="eager"
          />
        </div>

        <Image
          src={image4}
          alt="리핏 서비스 소개"
          className="h-auto w-full max-w-[564px]"
        />
        <div className="relative w-full max-w-[564px] bg-[#2E2926] [container-type:inline-size]">
          <Image
            src={image5}
            alt="사전신청 프로모션 섹션"
            className="h-auto w-full max-w-[564px]"
          />
          <div className="w-full px-[7.6%] pb-10 sm:pb-14">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#ff7014] py-3.5 text-[clamp(19px,4.5cqw,48px)] font-bold leading-none text-white shadow-[0_8px_24px_rgba(255,112,20,0.35)] transition-all duration-200 hover:bg-[#e66010] active:bg-[#e66010] sm:py-5"
            >
              <span>30초만에 더 알아보기</span>
              <svg
                className="h-[0.9em] w-[0.9em] shrink-0 translate-y-[-0.5px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <Image
          src={footer}
          alt="푸터"
          className="h-auto w-full max-w-[564px]"
        />
        <div className="w-full bg-[#1A1C1F] pb-[120px] sm:pb-[140px]" />
      </section>
      </main>

      <FormModalTrigger open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  );
}
