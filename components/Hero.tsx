"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const loadingRef = useRef<HTMLDivElement | null>(null);

  const totalVideos = 4;

  const videoFrameRef = useRef<HTMLDivElement | null>(null);
  const nextVidRef = useRef<HTMLVideoElement | null>(null);
  const currentVidRef = useRef<HTMLVideoElement | null>(null);

  const getVideoSrc = (index: number) => `/videos/hero-${index}.mp4`;
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniPlayerClick = () => {
    setHasClicked(true);
    setCurrentIndex((prev) => (prev % totalVideos) + 1);
  };

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // REMOVE LOADING WHEN READY (MINIMUM DELAY + FALLBACK)
  useEffect(() => {
    const minDuration = setTimeout(() => {
      if (loadedVideos >= 2) setIsLoading(false);
    }, 1200);

    const fallback = setTimeout(() => setIsLoading(false), 4000);

    return () => {
      clearTimeout(minDuration);
      clearTimeout(fallback);
    };
  }, [loadedVideos]);

  // 🔥 GSAP LOADING EXIT ANIMATION
  useGSAP(
    () => {
      if (!isLoading && loadingRef.current) {
        gsap.to(loadingRef.current, {
          y: "-100%",
          opacity: 0,
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => {
            loadingRef.current!.style.display = "none";
          },
        });
      }
    },
    { dependencies: [isLoading] }
  );

  // VIDEO TRANSITION
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set(nextVidRef.current, { visibility: "visible" });

        gsap.to(nextVidRef.current, {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power2.inOut",
          onStart: () => {
            nextVidRef.current?.play()?.catch(() => {});
          },
        });

        gsap.from(currentVidRef.current, {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.2,
          ease: "power2.inOut",
        });
      }
    },
    { dependencies: [currentIndex] }
  );

  // SCROLL CLIP PATH
  useGSAP(() => {
    gsap.fromTo(
      videoFrameRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(8% 0%, 74% 2%, 93% 95%, 18% 100%)",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: videoFrameRef.current,
          start: "top top",
          end: "+=500",
          scrub: true,
        },
      }
    );
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">

      {/* LOADING SCREEN */}
      <div
        ref={loadingRef}
        className="flex-center absolute z-50 h-dvh w-full bg-violet-50"
        style={{ pointerEvents: isLoading ? "all" : "none" }}
      >
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
      </div>

      <div
        id="video-frame"
        ref={videoFrameRef}
        className="relative h-dvh z-10 w-screen overflow-hidden rounded-lg"
      >
        <div>
          {/* MINI PLAYER */}
          <div className="mask-clip-path absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniPlayerClick}
              className="origin-center scale-50 opacity-[0.01] transition-all duration-500 hover:scale-100 hover:opacity-100"
            >
              <video
                ref={currentVidRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                playsInline
                preload="auto"
                onLoadedData={handleVideoLoad}
                className="size-64 origin-center scale-150 object-cover"
              />
            </div>
          </div>

          {/* NEXT VIDEO */}
          <video
            key={currentIndex}
            ref={nextVidRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
            className="absolute invisible z-20 top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 object-cover"
          />

          {/* BACKGROUND VIDEO */}
          <video
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>

        {/* RIGHT BOTTOM TITLE */}
        <h1 className="font-bebas hero-heading absolute bottom-5 right-5 z-50 text-blue-100 text-9xl">
          G<b>a</b>ming
        </h1>

        {/* LEFT TEXT */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="font-bebas hero-heading text-blue-100 text-9xl">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 text-blue-100 font-sans">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button className="bg-lime-300 px-6 py-5 text-foreground rounded-full flex items-center gap-1">
              <TiLocationArrow className="mr-2 h-4 w-4" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>

      {/* OUTLINE TEXT */}
      <h1 className="font-bebas hero-heading absolute bottom-5 right-5 z-0 text-black text-9xl">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
