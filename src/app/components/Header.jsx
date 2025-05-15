"use client";

import { useState } from "react";
// import { Menu, X } from 'lucide-react'; // You can use any icon library

const navLinks = ["About", "News", "Services", "Our Team", "Make Enquiry"];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm max-w-[1400px] mx-auto border border-red-900">
      <div className="pt-[21px] md:pt-[32px] pr-[24px] md:pr-[33px] pb-[24px] md:pb-[33px] pl-[27.6px] md:pl-[39px] flex items-center justify-between font-work-sans">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-5">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              {link}
            </a>
          ))}
        </nav>

        <button className="border border-[#000000] bg-[#FFFCFA] flex items-center  gap-4 font-[400] text-[16px] leading-[110%] tracking-[0px] pt-[10px] pb-[8px] pl-[16px] pr-[12px] font-work-sans ">
          Contact us
          <img src="/icons/rightArrow.svg" alt="Arrow" />
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? "X" : <img src="/icons/menu.svg" alt="Menu Icon" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
