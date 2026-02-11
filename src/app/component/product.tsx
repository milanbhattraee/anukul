"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Package, ChevronLeft, ChevronRight, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";

import products from "../../../asset/product.json";
import { useCart } from "./cartContext";

const ITEMS_PER_PAGE = 9;

export default function ProductListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart, isInCart } = useCart();

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

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <section
      id="products"
      className="py-16 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Background Blobs */}
      <div className="ocean-blob ocean-blob-1" />
      <div className="ocean-blob ocean-blob-2" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600">
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
              {paginatedProducts.map((product, index) => {
                const inCart = isInCart(product.name);
                
                return (
                  <div
                    key={index}
                    className="glass-light rounded-2xl p-4 hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden bg-white">
                      <Image
                        src={product.imageurl}
                        alt={product.name}
                        fill
                        className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                      />
                      {inCart && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <Check size={18} className="text-white" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <span className="inline-block px-2 py-0.5 text-xs font-medium text-cyan-700 bg-cyan-50 rounded-full">
                        {product.category}
                      </span>
                      <h3 className="text-base font-semibold text-slate-800 line-clamp-2 min-h-[3rem]">
                        {product.name}
                      </h3>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={inCart}
                        className={`w-full mt-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm flex items-center justify-center gap-2 ${
                          inCart
                            ? "bg-green-500 text-white cursor-default"
                            : "text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                        }`}
                      >
                        {inCart ? (
                          <>
                            <Check size={18} />
                            Added to Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={18} />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
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
                    className="p-2 rounded-xl glass-light hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Smart pagination with ellipsis */}
                  {(() => {
                    const pages = [];
                    const showEllipsis = totalPages > 7;
                    
                    if (!showEllipsis) {
                      // Show all pages if 7 or fewer
                      for (let i = 1; i <= totalPages; i++) {
                        pages.push(i);
                      }
                    } else {
                      // Always show first page
                      pages.push(1);
                      
                      if (currentPage <= 3) {
                        // Near start: 1 2 3 4 ... last
                        pages.push(2, 3, 4, '...', totalPages);
                      } else if (currentPage >= totalPages - 2) {
                        // Near end: 1 ... last-3 last-2 last-1 last
                        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                      } else {
                        // Middle: 1 ... current-1 current current+1 ... last
                        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                      }
                    }
                    
                    return pages.map((page, index) => {
                      if (page === '...') {
                        return (
                          <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
                            ...
                          </span>
                        );
                      }
                      
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-xl cursor-pointer font-medium transition-all duration-300 ${
                            currentPage === page
                              ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg"
                              : "glass-light hover:bg-cyan-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    });
                  })()}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl glass-light hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </section>
  );
}