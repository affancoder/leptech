"use client";

import React from "react";
import { Mail } from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#d4d1ca] text-[#2a2a2a] font-mono py-12 px-6 md:px-12 lg:px-[60px]">
      <div className="max-w-7xl mx-auto">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 mb-12">

          {/* Column 1 — Brand */}
          <div className="flex flex-col items-start">
            <span className="text-[16px] italic leading-none">
              leptech.ai
            </span>
          </div>

          {/* Column 2 — Navigation */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-5">
              <a href="#" className="text-[11px] uppercase tracking-widest hover:opacity-60 transition">
                Home
              </a>
              <a href="#" className="text-[11px] uppercase tracking-widest hover:opacity-60 transition">
                leptech.ai
              </a>
            </div>

            <div className="flex flex-col space-y-5">
              <a href="#" className="text-[11px] uppercase tracking-widest hover:opacity-60 transition">
                Weddings
              </a>
              <a href="#" className="text-[11px] uppercase tracking-widest hover:opacity-60 transition whitespace-nowrap">
                Corporate & Gifting
              </a>
              <a href="#" className="text-[11px] uppercase tracking-widest hover:opacity-60 transition">
                Hospitality
              </a>
            </div>
          </div>

          {/* Column 3 — Emails */}
          <div className="flex flex-col space-y-5">
            <div className="flex items-center gap-2">
              <Mail size={14} strokeWidth={1.5} />
              <span className="text-[11px] tracking-wide">
                enquiries@leptech.ai
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={14} strokeWidth={1.5} />
              <span className="text-[11px] tracking-wide">
                media@leptech.ai
              </span>
            </div>
          </div>

          {/* Column 4 — Legal */}
          <div className="flex flex-col space-y-5 lg:items-end">
            <a href="#" className="text-[11px] uppercase tracking-widest hover:opacity-60 transition">
              Privacy Policy
            </a>
            <a href="#" className="text-[11px] uppercase tracking-widest hover:opacity-60 transition">
              Terms of Service
            </a>
            <a href="#" className="text-[11px] uppercase tracking-widest hover:opacity-60 transition">
              Cookies Settings
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#b5b2ab]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

            <p className="text-[12px] sm:text-[13px] opacity-70 font-semibold text-center sm:text-left">
              © 2026 leptech.ai. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              {[FaInstagram, FaFacebook, FaTiktok, FaTwitter, FaLinkedin].map(
                (Icon, i) => (
                  <Icon
                    key={i}
                    className="w-[18px] h-[18px] cursor-pointer hover:opacity-60 transition"
                  />
                )
              )}
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;