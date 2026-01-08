"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Business Owner",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    rating: 5,
    text: "Excellent service! They repaired my laptop within 2 days and it works perfectly now. The staff was very professional and the pricing was fair."
  },
  {
    name: "Sita Sharma",
    role: "Teacher",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sita",
    rating: 5,
    text: "Bought a mixer grinder from Anukul and I'm extremely satisfied. Quality products at reasonable prices. Highly recommend!"
  },
  {
    name: "Anil Thapa",
    role: "Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anil",
    rating: 5,
    text: "Best electronics shop in town! They have a wide range of products and their repair service is top-notch. Very satisfied with their work."
  },
  {
    name: "Priya Gurung",
    role: "Student",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    rating: 4,
    text: "Great experience buying my water purifier from here. The team explained everything clearly and installation was smooth."
  },
  {
    name: "Mohan Rai",
    role: "Shopkeeper",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohan",
    rating: 5,
    text: "I've been a regular customer for 3 years. Their after-sales service is excellent and they always stand behind their products."
  },
  {
    name: "Sunita Tamang",
    role: "Homemaker",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita",
    rating: 5,
    text: "Very helpful staff! They guided me through choosing the right products for my home. Quality is excellent and prices are competitive."
  }
];

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
      {/* Background Blobs */}
      <div className="ocean-blob ocean-blob-1" />
      <div className="ocean-blob ocean-blob-2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600">
              Customer Reviews
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            See what our happy customers have to say
          </p>
        </div>

        {/* Testimonials Scroll Container */}
        <div className="overflow-x-auto hide-scrollbar pb-6 -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="flex gap-4 sm:gap-6" style={{ minWidth: 'min-content' }}>
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="glass-light rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:shadow-xl transition-all duration-300 active:scale-95 touch-manipulation shrink-0"
                style={{ width: '280px' }}
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600">
                    <Quote size={20} className="text-white" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < testimonial.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-slate-300'
                      }
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
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
          0%, 100% {
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

        /* Hide horizontal scrollbar completely */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </section>
  );
}
