"use client";

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Background Blobs */}
      <div className="footer-blob footer-blob-1" />
      <div className="footer-blob footer-blob-2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 mb-3 sm:mb-4">
              Anukul
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              Your trusted partner for quality electronics and reliable repair services in Nepal.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="#"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full glass-dark flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 active:scale-95 touch-manipulation"
              >
                <Facebook size={20} className="text-slate-300" />
              </a>
              <a
                href="#"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full glass-dark flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 active:scale-95 touch-manipulation"
              >
                <Instagram size={20} className="text-slate-300" />
              </a>
              <a
                href="#"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full glass-dark flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 active:scale-95 touch-manipulation"
              >
                <Twitter size={20} className="text-slate-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-slate-400 text-sm sm:text-base hover:text-cyan-400 transition-colors duration-300 inline-block py-1 touch-manipulation">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 text-sm sm:text-base hover:text-cyan-400 transition-colors duration-300 inline-block py-1 touch-manipulation">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 text-sm sm:text-base hover:text-cyan-400 transition-colors duration-300 inline-block py-1 touch-manipulation">
                  Repair Services
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 text-sm sm:text-base hover:text-cyan-400 transition-colors duration-300 inline-block py-1 touch-manipulation">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 text-sm sm:text-base hover:text-cyan-400 transition-colors duration-300 inline-block py-1 touch-manipulation">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Categories</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                  Water Purifiers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                  Mixer & Blenders
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                  Kitchen Appliances
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                  Home Electronics
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-cyan-400 shrink-0 mt-1" />
                <span className="text-slate-400">
                  Patan, Bagmati Province<br />Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-cyan-400 shrink-0" />
                <span className="text-slate-400">+977 9812345678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-cyan-400 shrink-0" />
                <span className="text-slate-400">info@anukul.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800"></div>

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © 2024 Anukul Electronics. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>in Nepal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}