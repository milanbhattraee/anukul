"use client";

import Link from "next/link";
import {
  IconSearch,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: "/deals" },
];

export default function Header() {


  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <header className="fixed top-0  left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className={`mt-4 h-20 backdrop-blur-xl flex items-center justify-between rounded-2xl ${scrolled
              ? "backdrop-blur-xl bg-white/30 shadow-md"
              : "bg-transparent shadow-none"} `}>
          {/* Logo */}
          <div className="px-8 text-xl font-bold tracking-wide">
            <span className="text-transparent bg-clip-text  bg-linear-to-r from-cyan-600 to-blue-600">
              Shopylib
            </span>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base font-medium text-slate-700 transition-all hover:text-cyan-600 relative group"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 px-6">
            <HeaderIcon>
              <IconSearch size={22} />
            </HeaderIcon>
            <HeaderIcon>
              <IconShoppingBag size={22} />
            </HeaderIcon>
            <HeaderIcon>
              <IconUser size={22} />
            </HeaderIcon>
          </div>
        </div>
      </div>
    </header>
  );
}

/* Small reusable icon wrapper */
function HeaderIcon({ children }: { children: React.ReactNode }) {
  return (
    <button className="p-2.5 rounded-xl text-slate-700 hover:text-cyan-600 glass-light hover:glass-strong transition-all">
      {children}
    </button>
  );
}
