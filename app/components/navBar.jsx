"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/Frame.svg"
import ConnectButtonIcon from "../../public/Frame1.svg"
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black">
      {/* Left: Logo and Title */}
      <div className="flex items-center space-x-3">
        <Image src={Logo} alt="Frame Logo" width={40} height={40} />
        <Link href="/">
        </Link>
      </div>
      {/* Right: Connect Wallet with icon */}
      <div className="flex items-center space-x-2">
        <ConnectButton.Custom>

        {({ account, openConnectModal, mounted }) => {

          return (

            <button

              onClick={openConnectModal}

              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white 

                         transition-all duration-300 shadow-md 

                         bg-gradient-to-r from-[#EC4899] to-[#BB5CF6]"

            >

<Image src={ConnectButtonIcon} alt="Connect Wallet Icon" width={24} height={24} />

              {account ? account.displayName : "Connect Wallet"}

            </button>

          );

        }}

      </ConnectButton.Custom>
      </div>
    </nav>
  );
}
