"use client";

import React from "react";
import Image from "next/image";
import Frame5 from "../../public/Frame5.svg"
import Frame4 from "../../public/Frame4.svg"
import Successful from "../../public/div.svg"


export default function MintSuccess() {
  return (
    <div className="bg-[#1e1e2b] max-w-xl mx-auto p-6 rounded-xl text-white shadow-lg">
      <div className="flex flex-col items-center">
        <Image src={Successful} alt="Success Icon" width={80} height={80} />
        <h2 className="text-2xl font-semibold mt-4 text-center">
          NFT Minted Successfully!
        </h2>
      </div>
      <p className="text-gray-300 mb-6 mt-2 text-center">
        Your NFT has been minted and added to your collection.
      </p>
      <div className="bg-[#8247e5] bg-opacity-10 rounded-lg p-4 mb-6">
        <div className="relative w-full h-52 mb-3">
          <Image
            src="/nft-placeholder.png"
            alt="Minted NFT"
            fill
            className="object-cover rounded"
          />
        </div>
        <h3 className="text-lg font-bold mt-2">Celestial Harmony #004</h3>
        <p className="text-sm text-gray-200">
          A mesmerizing blend of cosmic elements and digital artistry.
        </p>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-gradient-to-r from-[#EC4899] to-[#BB5CF6] w-full py-2 rounded-full hover:bg-gradient-to-r from-[#EC4899] to-[#BB5CF6] flex items-center justify-center space-x-2"
          onClick={() => {
            // Implement share functionality
            console.log("Share NFT");
          }}
        >
          <Image src={Frame4} alt="Share Icon" width={20} height={20} />
          <span>Share</span>
        </button>
        <button
          className="bg-gradient-to-r from-[#EC4899] to-[#BB5CF6] w-full py-2 rounded-full hover:bg-gradient-to-r from-[#EC4899] to-[#BB5CF6] flex items-center justify-center space-x-2"
          onClick={() => window.location.reload()}
        >
          <Image src={Frame5} alt="Mint Another Icon" width={20} height={20} />
          <span>Mint Another</span>
        </button>
      </div>
    </div>
  );
}
