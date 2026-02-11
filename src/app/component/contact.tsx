"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Map } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear status message when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all fields",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderName: formData.name,
          senderEmail: formData.email,
          senderPhone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! We'll get back to you soon.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 relative overflow-hidden bg-linear-to-b from-slate-50 to-white">
      {/* Background Blobs */}
      <div className="ocean-blob ocean-blob-1" />
      <div className="ocean-blob ocean-blob-2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-600">
              Get In Touch
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Have questions? We'd love to hear from you
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    
    {/* LEFT COLUMN: INFO & MAP (4/12 width on desktop) */}
    <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
      
      {/* Contact & Location Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {/* Contact Card */}
        <div className="glass-light rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-r from-cyan-600 to-blue-600 mb-4 shadow-md shrink-0">
            <Phone size={26} className="text-white" />
          </div>
          <h3 className="font-bold text-slate-800 text-lg mb-2">Contact Info</h3>
          <p className="text-slate-600 text-sm sm:text-base">+977 9812345678</p>
          <p className="text-slate-600 text-sm sm:text-base">anukul@gmail.com</p>
        </div>

        {/* Location Card */}
        <div className="glass-light rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 mb-4 shadow-md shrink-0">
            <Map size={26} className="text-white" />
          </div>
          <h3 className="font-bold text-slate-800 text-lg mb-2">Our Location</h3>
          <p className="text-slate-600 text-sm sm:text-base">Birtamode, Jhapa</p>
          <p className="text-slate-600 text-sm sm:text-base">Nepal</p>
        </div>
      </div>

      {/* Map Card */}
      <div className="glass-light rounded-2xl p-3 hover:shadow-xl transition-all duration-300">
        <div className="w-full h-64 lg:h-72 rounded-xl overflow-hidden border border-slate-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.44961559477!2d87.98188157523912!3d26.666063676794697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5ba596f24301d%3A0xc31c039f99602e97!2sBirtamode!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Birtamode, Jhapa Location"
          />
        </div>
        <a
          href="https://goo.gl/maps/example"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 transition-all"
        >
          <MapPin size={18} />
          Open in Google Maps
        </a>
      </div>
    </div>

    {/* RIGHT COLUMN: CONTACT FORM (8/12 width on desktop) */}
    <div className="lg:col-span-8 order-1 lg:order-2">
      <div className="glass-light rounded-3xl p-6 sm:p-10 shadow-sm border border-white/20">
        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            Send us a message
          </h3>
          <p className="text-slate-500">We'll get back to you within 24 hours.</p>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-slate-700 ml-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold text-slate-700 ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
              placeholder="+977 98..."
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-slate-700 ml-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none placeholder:text-slate-400"
              placeholder="How can we help you?"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full md:w-auto min-w-50 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-bold bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-600 shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              {!isSubmitting && <Send size={20} />}
            </button>
          </div>

          {/* Status Message */}
          {submitStatus.type && (
            <div className={`mt-4 flex items-center gap-3 p-4 rounded-xl border ${
              submitStatus.type === "success" 
                ? "bg-green-50 border-green-200 text-green-800" 
                : "bg-red-50 border-red-200 text-red-800"
            }`}>
              {submitStatus.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <p className="text-sm font-medium">{submitStatus.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </section>
  );
}