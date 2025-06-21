import { useState } from "react";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import contractABI from "../constants/contractABI.json";

const CONTRACT_ADDRESS = "0x743f49311a82fe72eb474c44e78da2a6e0ae951c";
const API_BASE_URL = "https://nft-minting-backend-tfa1.onrender.com";

export const useMintNFT = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const walletClient = typeof window !== "undefined" && window.ethereum
    ? createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
      })
    : null;

  const mintNFT = async (name, description, imageUrl, jwtToken) => {
    if (!address) {
      setError("Wallet not connected");
      return { success: false, error: "Wallet not connected" };
    }

    if (!jwtToken) {
      setError("Authentication token missing");
      return { success: false, error: "Authentication token missing" };
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Store NFT metadata in the backend (Backend will generate tokenId)
      const metadataResponse = await fetch(`${API_BASE_URL}/nft/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ name, description, imageUrl }),
      });

      if (!metadataResponse.ok) {
        const errorData = await metadataResponse.json();
        throw new Error(errorData.error || "Failed to store NFT metadata");
      }

      const { tokenId, metadataUrl } = await metadataResponse.json();

      if (!tokenId || !metadataUrl) throw new Error("Invalid metadata response");

      // Step 2: Mint NFT on-chain
      const { request } = await publicClient.simulateContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: "mint",
        args: [tokenId, metadataUrl],
        account: address,
      });

      await walletClient.writeContract(request);

      return { success: true, tokenId, metadataUrl };
    } catch (err) {
      console.error("Minting error:", err);
      setError(err.message || "An error occurred");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { mintNFT, loading, error };
};
