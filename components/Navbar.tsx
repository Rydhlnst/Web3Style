"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { TiLocationArrow } from "react-icons/ti";
import Link from "next/link";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  const { y: scrollY } = useWindowScroll();

  /** -------------------------------------
   *  SCROLL LOGIC — DETECT HIDE / SHOW
   * ------------------------------------*/
  useEffect(() => {
    if (scrollY === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (scrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if(scrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(scrollY);
  }, [scrollY, lastScrollY]);

  /** -------------------------------------
   *  GSAP ANIMATION FOR NAVBAR
   * ------------------------------------*/
  useEffect(() => {
    if (!navContainerRef.current) return;

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -120,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
      ease: "power3.out",
      pointerEvents: "auto",
    });
  }, [isNavVisible]);

  /** -------------------------------------
   *  AUDIO BUTTON LOGIC
   * ------------------------------------*/
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioRef.current?.play().catch(() => {});
    } else {
      audioRef.current?.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Image
              src="/img/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="w-10"
            />

            <Button className="bg-blue-100/50 backdrop-blur-md hover:scale-105 hidden md:flex items-center gap-1 rounded-full px-6 text-black hover:bg-blue-200/50">
              <TiLocationArrow />
              Products
            </Button>
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* AUDIO BUTTON */}
            <button className="ml-10 flex items-center gap-2" onClick={toggleAudioIndicator}>
              <audio ref={audioRef} src="/audio/loop.mp3" className="hidden" loop />

              {/* VISUAL INDICATOR */}
              <div className="flex items-end gap-[3px]">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-[3px] rounded-sm bg-white transition-all duration-300 ${
                      isIndicatorActive
                        ? `animate-wave-${i}`
                        : "h-3 opacity-30"
                    }`}
                  />
                ))}
              </div>
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
