"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import FormModalTrigger from "./FormModalTrigger";


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
          className={`pointer-events-auto absolute left-1/2 top-4 inline-flex -translate-x-1/2 whitespace-nowrap rounded-full bg-[#e8e4e0] px-5 py-2 text-[clamp(13px,2cqw,36px)] font-semibold leading-none text-[#444444] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 sm:top-8 sm:px-8 sm:py-3 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0"
          }`}
        >
          진지한 연애를 생각하는 {mounted ? viewerCount : 18}명이 보고 있어요 👀
        </div>
      </div>

      <main className="relative mx-auto w-full max-w-[564px] min-h-screen bg-[#fffcf9] shadow-[0_0_20px_rgba(0,0,0,0.05)]">
        <section className="relative overflow-hidden px-5 pb-0 pt-10 sm:px-8 sm:pt-14">
        <div className="pointer-events-none absolute -left-24 -top-36 h-[360px] w-[360px] rounded-full bg-[linear-gradient(220deg,rgba(255,228,203,0.24)_0%,rgba(255,255,255,1)_100%)] blur-sm" />
        <div className="pointer-events-none absolute -right-20 top-20 h-[320px] w-[320px] rounded-full bg-[linear-gradient(216deg,rgba(255,228,203,0.65)_0%,rgba(255,255,255,0.7)_100%)] blur-md" />

        <div className="relative mx-auto flex w-full max-w-[564px] flex-col items-center text-center [container-type:inline-size]">
          {/* Invisible placeholder to maintain layout space */}
          <div
            className="pointer-events-none mb-8 inline-flex whitespace-nowrap rounded-full px-5 py-2 text-[clamp(13px,2cqw,36px)] font-semibold leading-none opacity-0 sm:mb-12 sm:px-8 sm:py-3"
            aria-hidden="true"
          >
            진지한 연애를 생각하는 {mounted ? viewerCount : 18}명이 보고 있어요 👀
          </div>

          <h1
            className="text-[clamp(48px,12cqw,108px)] font-bold leading-[1.1] tracking-[-0.03em] text-[#222222]"
            style={{
              WebkitTextStroke: "clamp(1px,0.3cqw,3px) #fff",
              paintOrder: "stroke fill",
            }}
          >
            <span className="block whitespace-nowrap">여러 명 말고,</span>
            <span className="block whitespace-nowrap font-black text-[#ff6f13]">딱 한 사람.</span>
            <span className="block whitespace-nowrap">제대로된 연애 시작</span>
          </h1>

          <p className="mt-6 text-[clamp(17px,4.6cqw,42px)] font-medium leading-[1.5] text-[#222222] sm:mt-10">
            <span className="block"><strong>전 연애를 기반</strong>으로 한{" "}<strong className="font-extrabold">AI 패턴 분석 매칭</strong>으로</span>
            <span className="block">이제 나와 맞는 사람을 만나세요!</span>
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
        <div className="w-full bg-[#ff7014] pb-[120px] sm:pb-[140px]" />
      </section>
      </main>

      <FormModalTrigger />
    </>
  );
}
