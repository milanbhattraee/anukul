"use client";

import Link from "next/link";
import {
  IconUser,
  IconMenu2,
  IconX,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useCart } from "../cartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Testimonial", href: "#testimonial" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

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
          className={`mt-2 md:mt-4 h-16 md:h-20 flex items-center justify-between rounded-2xl px-3 md:px-6 transition-all duration-300 ${
            scrolled
              ? "bg-white/80 backdrop-blur-3xl shadow-lg border border-slate-200/50"
              : "bg-white/60 backdrop-blur-sm"
          }`}
        >
          {/* Logo */}
          <div className="text-lg md:text-xl font-bold tracking-wide">
            <Link href="/">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-blue-600">
                Anukul
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base font-medium text-slate-700 transition-all hover:text-cyan-600 relative group"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-linear-to-r from-cyan-600 to-blue-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <Link href="/cart">
              <button className="relative p-2.5 rounded-xl text-slate-700 hover:text-cyan-600 glass-light hover:bg-white/80 transition-all">
                <IconShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            {/* Contact Button - Desktop */}
            <div className="hidden sm:block">
              <Link href="#contact">
                <button className="p-2.5 rounded-xl text-slate-700 hover:text-cyan-600 glass-light hover:bg-white/80 transition-all flex items-center gap-2">
                  <IconUser size={20} />
                  <span className="hidden lg:inline">Contact Us</span>
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:text-cyan-600 glass-light hover:bg-white/80 transition-all"
            >
              {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-slate-200/50 animate-in slide-in-from-top duration-300">
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-cyan-50 hover:text-cyan-600 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="p-4 pt-0 border-t border-slate-200 space-y-2">
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl glass-light hover:bg-cyan-50 transition-all text-slate-700 hover:text-cyan-600">
                  <IconShoppingCart size={20} />
                  Cart ({cartCount})
                </button>
              </Link>
              <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl glass-light hover:bg-cyan-50 transition-all text-slate-700 hover:text-cyan-600">
                  <IconUser size={20} />
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 