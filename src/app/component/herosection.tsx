"use client";

import { Button } from "@mantine/core";
import { IconArrowRight, IconSparkles } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Animated Ocean Background Blobs */}
      <div className="ocean-blob ocean-blob-1" />
      <div className="ocean-blob ocean-blob-2" />
      <div className="ocean-blob ocean-blob-3" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Highlight Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-light mb-4 sm:mb-6 ocean-glow-sm">
              <IconSparkles size={14} className="text-cyan-600 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium text-cyan-700">
                New Electronics Arrivals
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600">
                Welcome to Anukul
              </span>
              <span className="block mt-2 text-slate-800">
                Buy & Repair Electronics Easily
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Explore our wide collection of electronic products or bring your
              old gadgets to be repaired. Anukul ensures quality, speed, and
              modern solutions for all your electronic needs.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex gap-3 sm:gap-4 flex-wrap">
              {/* Primary Button */}
              <Link href="#products" className="relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 touch-manipulation">
                Browse Products
                <IconArrowRight size={20} className="ml-1" />
                {/* Subtle moving shine */}
                <span className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 hover:opacity-30 transition-all duration-300 pointer-events-none"></span>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-8 sm:mt-12 flex gap-4 sm:gap-8">
              <div className="glass-light px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl flex-1 sm:flex-initial">
                <p className="text-2xl sm:text-3xl font-bold text-cyan-600">
                  2K+
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Products
                </p>
              </div>
              <div className="glass-light px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl flex-1 sm:flex-initial">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  5K+
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Happy Customers
                </p>
              </div>
              <div className="glass-light px-6 py-4 rounded-2xl">
                <p className="text-3xl font-bold text-indigo-600">1K+</p>
                <p className="text-sm text-slate-600 mt-1">Items Repaired</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - SINGLE IMAGE */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md h-96 md:h-[28raem]">
              <Image
                src="/hero.png"
                alt="Featured Product"
                fill
                priority
                className="rounded-3xl hover:scale-105 transition-all ease-linear duration-150 object-contain shadow-xl"

              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
