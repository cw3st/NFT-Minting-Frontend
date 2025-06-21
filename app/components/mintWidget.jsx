"use client";

import React, { useState } from "react";
import MintSuccess from "./mintSuccess";
import Image from "next/image";
import Frame3 from "../../public/Frame1.svg";
import { useAccount, useWalletClient } from "wagmi";
import { writeContract, readContract } from "@wagmi/core";
import contractABI from "../constants/contractABI.json";

const CONTRACT_ADDRESS = "0x743f49311a82fe72eb474c44e78da2a6e0ae951c";
const API_BASE_URL = "https://nft-minting-backend-tfa1.onrender.com"; // Replace with actual backend URL

export default function MintWidget() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isMinted, setIsMinted] = useState(false);
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftImageUrl, setNftImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateUniqueTokenId = async () => {
    let tokenId;
    let exists = true;
    while (exists) {
      tokenId = Math.floor(Math.random() * 1000000);
      exists = await readContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: "checkId",
        args: [tokenId],
      });
    }
    return tokenId;
  };

  const storeNFTMetadata = async (tokenId) => {
    const response = await fetch(`${API_BASE_URL}/nft/store`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenId, name: nftName, description: nftDescription, image: nftImageUrl }),
    });
    if (!response.ok) throw new Error("Failed to store metadata");
    return `${API_BASE_URL}/nft/${tokenId}`;
  };

  const mintNFT = async () => {
    if (!walletClient || !address) {
      alert("Please connect your wallet!");
      return;
    }
    setLoading(true);
    try {
      const tokenId = await generateUniqueTokenId();
      const metadataUrl = await storeNFTMetadata(tokenId);

      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: "mint",
        args: [tokenId, metadataUrl],
      });

      setIsMinted(true);
    } catch (error) {
      console.error("Minting failed:", error);
      alert("Minting failed. Please try again.");
    }
    setLoading(false);
  };

  if (isMinted) {
    return <MintSuccess />;
  }

  return (
    <div className="bg-[#1e1e2b] rounded-xl p-6 shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Mint Your NFT</h2>
      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-400">NFT Name</label>
        <input
          type="text"
          placeholder="Enter NFT Name"
          className="w-full p-2 rounded bg-[#14141f] border border-gray-700 focus:outline-none"
          value={nftName}
          onChange={(e) => setNftName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-400">Description</label>
        <textarea
          placeholder="Enter NFT Description"
          className="w-full p-2 rounded bg-[#14141f] border border-gray-700 focus:outline-none"
          rows={3}
          value={nftDescription}
          onChange={(e) => setNftDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-400">Image URL</label>
        <input
          type="text"
          placeholder="Enter NFT Image URL"
          className="w-full p-2 rounded bg-[#14141f] border border-gray-700 focus:outline-none"
          value={nftImageUrl}
          onChange={(e) => setNftImageUrl(e.target.value)}
        />
      </div>    
      <button
        onClick={mintNFT}
        className="w-full bg-gradient-to-r from-[#EC4899] to-[#BB5CF6] py-2 rounded-full hover:bg-[#713bd5] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        disabled={loading}
      >
        <Image src={Frame3} alt="Mint NFT Icon" width={20} height={20} />
        <span>{loading ? "Minting..." : "Mint NFT"}</span>
      </button>
    </div>
  );
}
