"use client";
import Link from "next/link";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title">
            Your AI Career Coach for
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your Carrer with personalized guidance, interview prep and
            AI-powered Tools for job success.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button className="px-8" size="lg">
              Get Started
            </Button>
          </Link>

          <Link href="/">
            <Button className="px-8" size="lg" variant="outline">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div className="hero-image" ref={imageRef}>
            <Image
              className="rounded-lg shadow-2xl border mx-auto"
              src={"/banner.jpeg"}
              width={1280}
              height={720}
              alt="Banner Sensai"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
