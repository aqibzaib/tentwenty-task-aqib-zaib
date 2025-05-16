"use client";

import { useState } from "react";
// import { Menu, X } from 'lucide-react'; // You can use any icon library

const navLinks = ["About", "News", "Services", "Our Team", "Make Enquiry"];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="mx-auto max-w-[1400px]">
      <div className="relative md:absolute md:top-[21px] z-10 w-full max-w-[1400px] bg-white shadow-sm ">
        <div className="font-work-sans flex items-center justify-between pt-[21px] pr-[24px] pb-[24px] pl-[27.6px] md:pt-[32px] md:pr-[33px] md:pb-[33px] md:pl-[39px]">
          {/* Desktop Navigation */}

          <nav className="hidden space-x-5 md:flex">
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

          <button className="font-work-sans flex items-center gap-4 border border-[#000000] bg-[#FFFCFA] pt-[10px] pr-[12px] pb-[8px] pl-[16px] text-[16px] leading-[110%] font-[400] tracking-[0px]">
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
          <div className="px-4 pb-4 md:hidden">
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
      </div>
    </header>
  );
}
