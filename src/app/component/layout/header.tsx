"use client";

import Link from "next/link";
import {
  IconUser,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Testimonial", href: "#testimonial" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll(); // run once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={`mt-2 md:mt-4 h-16 md:h-20 flex items-center justify-between rounded-2xl px-3 md:px-0 transition-all duration-300 ${
            scrolled
              ? "bg-transparent backdrop-blur-3xl ocean-glow-sm shadow-lg"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <div className="px-3 md:px-8 text-lg md:text-xl font-bold tracking-wide">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              Anukul
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base font-medium text-slate-700 transition-all hover:text-cyan-600 relative group"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 px-2 md:px-6">
            <div className="hidden sm:block">
              <HeaderIcon>
                <Link href="#contact" className="flex items-center gap-2 text-blue-800">
                  <IconUser size={20} />
                  <span>Contact Us</span>
                </Link>
              </HeaderIcon>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:text-cyan-600 glass-light hover:glass-strong transition-all"
            >
              {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 glass-strong backdrop-blur-xl rounded-2xl overflow-hidden ocean-glow-sm animate-in slide-in-from-top duration-300">
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-white/50 hover:text-cyan-600 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="p-4 pt-0 border-t border-slate-200">
              <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl glass-light hover:glass-strong transition-all text-blue-800">
                <IconUser size={20} />
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function HeaderIcon({ children }: { children: React.ReactNode }) {
  return (
    <button className="p-2.5 rounded-xl text-slate-700 hover:text-cyan-600 glass-light hover:glass-strong transition-all">
      {children}
    </button>
  );
}
