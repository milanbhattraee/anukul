"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Background Blobs */}
      <div className="ocean-blob ocean-blob-1" />
      <div className="ocean-blob ocean-blob-2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600">
              Get In Touch
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Have questions? We'd love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
         <div className="space-y-6">
  {/* Contact Card (Phone + Email) */}
  <div className="glass-light rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Phone */}
    <div className="flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 mb-4 shadow-md">
        <Phone size={26} className="text-white" />
      </div>
      <h3 className="font-semibold text-slate-800 text-lg mb-1">Phone</h3>
      <p className="text-slate-600">+977 9812345678</p>
      <p className="text-slate-600">+977 9898765432</p>
    </div>

    {/* Email */}
    <div className="flex flex-col items-center text-center pt-6 md:pt-0 md:pl-6">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 shadow-md">
        <Mail size={26} className="text-white" />
      </div>
      <h3 className="font-semibold text-slate-800 text-lg mb-1">Email</h3>
      <p className="text-slate-600">info@anukul.com</p>
      <p className="text-slate-600">support@anukul.com</p>
    </div>
  </div>

  {/* Location Card */}
  <div className="glass-light rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 mb-4 shadow-md">
      <MapPin size={26} className="text-white" />
    </div>
    <h3 className="font-semibold text-slate-800 text-lg mb-1">Location</h3>
    <p className="text-slate-600">Patan, Bagmati Province</p>
    <p className="text-slate-600">Nepal</p>
  </div>
</div>
    

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-light rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">
                Send us a message
              </h3>

              <div className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 text-base rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition-all touch-manipulation"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 text-base rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition-all touch-manipulation"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 text-base rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition-all touch-manipulation"
                    placeholder="+977 9812345678"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3.5 text-base rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition-all resize-none touch-manipulation"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 touch-manipulation"
                >
                  Send Message
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ocean-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: float 20s ease-in-out infinite;
        }

        .ocean-blob-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(45deg, #06b6d4, #3b82f6);
          top: -100px;
          left: -100px;
          animation-delay: 0s;
        }

        .ocean-blob-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(45deg, #3b82f6, #6366f1);
          bottom: -100px;
          right: -100px;
          animation-delay: 7s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .glass-light {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}
