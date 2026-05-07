"use client";

import React from "react";
import Link from "next/link";
import { FiMessageCircle } from "react-icons/fi";

const FloatingContactButton = () => {
  return (
    <Link
      href="/contact"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-[#d3e97a] text-black rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Contact Me"
    >
      <div className="absolute -inset-1 bg-[#d3e97a] rounded-full blur opacity-20 group-hover:opacity-40 animate-pulse"></div>
      <FiMessageCircle className="w-6 h-6 relative z-10" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 px-3 py-1.5 bg-zinc-900 text-[#d3e97a] text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-zinc-800">
        Let's Talk
      </span>
    </Link>
  );
};

export default FloatingContactButton;
