"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  title: string;
  containerClass?: string;
  sectionId?: string
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ title, containerClass, sectionId }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const words = self.selector!(".animated-word");

      // INITIAL STATE
      gsap.set(words, {
        opacity: 0,
        transform:
          "translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)",
      });

      // TRIGGERED ANIMATION
      gsap.to(words, {
        opacity: 1,
        transform: "translate3d(0,0,0) rotateX(0) rotateY(0)",
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id={sectionId}
      ref={containerRef}
      className={`mt-5 text-center text-4xl uppercase leading-[0.8] tracking-tighter font-bold md:text-[6rem] ${containerClass ?? ""}`}
    >
      {title.split("<br/>").map((line, index) => (
        <div
          key={index}
          className="flex items-center justify-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, i) => (
            <span
              key={i}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
