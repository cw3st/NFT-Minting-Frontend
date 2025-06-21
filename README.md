# NFT Minting Frontend

Welcome! This project is a web application that lets you create ("mint") and view NFTs (Non-Fungible Tokens) on the blockchain. It is built using [Next.js](https://nextjs.org), a popular React framework, and is designed to be easy to use for everyone, whether you're a developer or not.

---

## What Does This App Do?

- **Connect your crypto wallet** (like MetaMask)
- **Mint (create) your own NFT** by providing a name, description, and image
- **View your NFT collection** in a personal gallery

---

## How Does It Work? (Simple Explanation)

1. **Connect Wallet:**  
   Click "Connect Wallet" to link your crypto wallet. This is needed to prove ownership and interact with the blockchain.

2. **Mint an NFT:**  
   Fill out a form with your NFT's name, description, and image URL. Click "Mint NFT" to create your NFT.  
   - The app talks to a backend server to store your NFT's details.
   - Then, it interacts with a smart contract on the blockchain to officially mint your NFT.

3. **View Your NFTs:**  
   After minting, your NFTs appear in your gallery. You can see their images, names, and details.

---

## How to Use (For Everyone)

1. **Install Node.js**  
   Download and install [Node.js](https://nodejs.org/) if you don't have it.

2. **Download the Project**  
   Get the code from GitHub or your source.

3. **Install Dependencies**  
   Open a terminal in the project folder and run:
   ```bash
   npm install
   ```

4. **Start the App**  
   Run:
   ```bash
   npm run dev
   ```
   Then open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Connect Your Wallet**  
   Click "Connect Wallet" and follow the instructions.

6. **Mint and View NFTs**  
   Use the form to mint NFTs and see them in your gallery.

---

## Project Structure (For Developers)

- **`app/`**  
  Main application code.
  - **`components/`**: UI parts like Navbar, Mint Widget, NFT Gallery, etc.
  - **`constants/`**: Contains the smart contract ABI.
  - **`hooks/`**: Custom React hooks for fetching and minting NFTs.
  - **`globals.css`**: Global styles.
  - **`layout.js`**: Main layout and providers.
  - **`page.js`**: Home page.

- **`public/`**  
  Static files and images.

- **Config files:**  
  - **`package.json`**: Project dependencies and scripts.
  - **`next.config.mjs`**: Next.js configuration.
  - **`tailwind.config.mjs`**: Tailwind CSS configuration.

---

## How Does Minting Work? (For Developers)

1. **User fills out the mint form** in [`MintWidget`](app/components/mintWidget.jsx).
2. **A unique token ID is generated** and checked for uniqueness on-chain.
3. **Metadata is stored** via a backend API (`/nft/store`).
4. **Smart contract interaction:**  
   The app calls the `mint` function on the NFT smart contract using the provided ABI ([`contractABI.json`](app/constants/contractABI.json)).
5. **NFT appears in the gallery** after successful minting.

---

## Technologies Used

- **Next.js**: React framework for server-side rendering and routing.
- **React**: UI library.
- **Tailwind CSS**: For styling.
- **RainbowKit & Wagmi**: For wallet connection and blockchain interactions.
- **Viem**: For low-level blockchain communication.
- **Backend API**: Handles NFT metadata storage.

---

## Need Help?

If you get stuck:
- Make sure your wallet is connected.
- Check your browser console for errors.
- Ask a developer for help if you see technical issues.

---

Enjoy minting your NFTs!