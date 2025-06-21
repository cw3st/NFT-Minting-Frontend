"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Image from "next/image";

const API_BASE_URL = "https://nft-minting-backend-tfa1.onrender.com"; 
const DEFAULT_IMAGE = "/default-placeholder.png";

export default function NFTGallery() {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isConnected && address) {
      fetchNFTs();
    }
  }, [isConnected, address]);

  const fetchNFTs = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      setError("Authentication required. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/nft/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch NFTs");
      const data = await response.json();
      setNfts(data.nfts || []);
    } catch (err) {
      setError(err.message || "An error occurred while fetching NFTs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#000000] to-[#111827] rounded-xl p-6 shadow-lg mx-auto max-w-5xl mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">Your NFT Gallery</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading NFTs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : nfts.length === 0 ? (
        <p className="text-center text-gray-400">
          No NFTs found, please mint your first one.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {nfts.map((nft, index) => (
            <div key={index} className="bg-[#14141f] rounded-lg p-4 shadow-md">
              <Image
                src={nft.imageUrl || DEFAULT_IMAGE}
                alt={nft.name}
                width={300}
                height={300}
                className="rounded-lg object-cover w-full h-48"
              />
              <h3 className="mt-3 text-lg font-semibold text-white">{nft.name}</h3>
              <p className="text-gray-400 text-sm">{nft.description}</p>
              <p className="text-gray-500 text-xs mt-2">Token ID: {nft.tokenId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
