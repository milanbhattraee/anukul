"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Package, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import products from "../../../asset/product.json";

const ITEMS_PER_PAGE = 9;

export default function ProductListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["all", ...cats];
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Paginate products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <section className="py-16 relative overflow-hidden bg-linear-to-b from-slate-50 to-white">
      {/* Background Blobs */}
      <div className="ocean-blob ocean-blob-1" />
      <div className="ocean-blob ocean-blob-2" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-600">
              Our Products
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Discover quality electronics for your everyday needs
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full glass-light border-0 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-slate-800"
            />
          </div>
          <div className="md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-full glass-light border-0 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-slate-800"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product,index) => (
                <div
                  key={index}
                  className="glass-light rounded-2xl p-4 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden bg-white group">
                    <Image
                      src={product.imageurl}
                      alt={product.name}
                      fill
                      className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <span className="inline-block px-2 py-0.5 text-xs font-medium text-cyan-700 bg-cyan-50 rounded-full">
                      {product.category}
                    </span>
                    <h3 className="text-base font-semibold text-slate-800 line-clamp-2">
                      {product.name}
                    </h3>
                    <button className="w-full mt-3 px-4 py-2 rounded-xl text-white font-medium bg-linear-to-r from-cyan-600 to-blue-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
{totalPages > 1 && (
  <div className="mt-12 flex flex-col items-center gap-2">
    {/* Page info */}
    <p className="text-slate-600 text-sm">
      Page {currentPage} of {totalPages}
    </p>

    {/* Buttons */}
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl glass-light hover:bg-linear-to-r hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={`px-4 py-2 rounded-xl cursor-pointer  font-medium transition-all duration-300 ${
            currentPage === i + 1
              ? "bg-linear-to-r from-cyan-600 to-blue-600 text-white shadow-lg"
              : "glass-light  hover:from-cyan-600 hover:to-blue-600 hover:bg-cyan-900"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl glass-light hover:bg-linear-to-r hover:from-cyan-600 hover:to-blue-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  </div>
)}

          </>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full glass-light mb-6">
              <Package size={40} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">
              No products found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
