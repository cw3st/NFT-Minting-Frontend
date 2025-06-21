import { useState, useEffect } from "react";

const API_BASE_URL = "https://nft-minting-backend-tfa1.onrender.com";

export const useFetchNFTs = (jwtToken: string | null) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jwtToken) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const fetchNFTs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/nft/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch NFTs");
        }

        const data = await response.json();
        setNfts(data.nfts);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [jwtToken]);

  return { nfts, loading, error };
};
