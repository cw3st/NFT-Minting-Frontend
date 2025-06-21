"use client";

import React from "react";
import Image from "next/image";
import Frame1 from "../../public/Frame1.svg";
import startCreating from "../../public/i.svg";
// import startCreating from "../../public/startCreating.svg"

export default function Hero() {
  return (
    <section className="text-center py-16">
      <h1 className="text-4xl font-extrabold mb-4">
        Discover & Collect Extraordinary NFTs
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        Enter the world of digital art and collectibles. Explore unique NFTs
        created by artists worldwide.
      </p>
      <div className="flex justify-center space-x-4">
        <button className="bg-gradient-to-r from-[#EC4899] to-[#BB5CF6] text-white py-2 px-6 rounded-full flex items-center space-x-2">
          <Image
            src={startCreating}
            alt="Start Creating Icon"
            width={20}
            height={20}
          />
          <span>Start Creating</span>
        </button>
        <button className="bg-transparent text-white py-2 px-6 rounded-full border border-[#8247e5] hover:bg-gradient-to-r from-[#EC4899] to-[#BB5CF6] flex items-center space-x-2">
          <Image src={Frame1} alt="Watch Demo Icon" width={20} height={20} />
          <span>Watch Demo</span>
        </button>
      </div>
    </section>
  );
}
