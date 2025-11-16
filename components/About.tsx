"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const maskRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=800",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      // Animasi clip-path + scale-up
      tl.to(maskRef.current, {
        width: "100vw",
        height: "100vh",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        borderRadius: 0,
        ease: "power2.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <div id="about" className="min-h-screen w-screen">
      {/* TOP TEXT */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-teko text-lg uppercase md:text-[20px]">
          Welcome to Zentry
        </h2>

        <AnimatedTitle 
            title="Disc<b>o</b>ver the world&apos;s<br/>l<b>a</b>rgest shared adventure"
            containerClass="!font-black mt-5 text-center"
            />

      </div>

      <div className="about-subtext z-30 text-black text-lg text-center pointer-events-none mb-10">
        <p>The game of Games begins—your life, now an epic MMORPG</p>
        <p>Zentry unites every player from countless game and platforms</p>
    </div>

      {/* CLIP SECTION */}
    <div ref={containerRef} id="clip" className="h-dvh w-screen relative">
    {/* IMAGE MASK */}
    <div
        ref={maskRef}
        className="mask-clip-path about-image absolute left-1/2 top-0 h-[60vh] w-96 -translate-x-1/2 overflow-hidden rounded-3xl z-20"
    >
        <Image
        src="/img/about.webp"
        alt="Background"
        fill
        className="object-cover"
        priority
        />
    </div>
    </div>

    </div>
  );
};

export default About;
