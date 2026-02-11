"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Send,
  CheckCircle,
  AlertCircle,
  Package,
} from "lucide-react";
import { useCart } from "../component/cartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleRemoveItem = (productName: string) => {
    removeFromCart(productName);
  };

  const handleSubmitOrder = async () => {
    // Validation
    if (!customerName.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please enter your name",
      });
      return;
    }

    if (!customerPhone.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please enter your phone number",
      });
      return;
    }

    if (cart.length === 0) {
      setSubmitStatus({
        type: "error",
        message: "Your cart is empty",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          customerPhone,
          products: cart,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Order placed successfully! We'll contact you soon.",
        });
        // Clear form and cart
        setCustomerName("");
        setCustomerPhone("");
        clearCart();
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to place order. Please try again.",
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
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white">
      {/* Background Blobs */}
      <div className="ocean-blob ocean-blob-1" />
      <div className="ocean-blob ocean-blob-2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600">
              Shopping Cart
            </span>
          </h1>
          <p className="mt-2 text-slate-600">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* Success/Error Message */}
        {submitStatus.type && (
          <div
            className={`mb-6 flex items-start gap-3 p-4 rounded-xl ${
              submitStatus.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {submitStatus.type === "success" ? (
              <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
            )}
            <p
              className={`text-sm ${
                submitStatus.type === "success" ? "text-green-800" : "text-red-800"
              }`}
            >
              {submitStatus.message}
            </p>
          </div>
        )}

        {cart.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full glass-light mb-6">
              <ShoppingCart size={48} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-slate-600 mb-6">
              Add some products to get started
            </p>
            <Link href="/#products">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-lg transition-all">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="glass-light rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  Cart Items
                </h2>
                <div className="space-y-4">
                  {cart.map((product, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-50 shrink-0">
                        <Image
                          src={product.imageurl}
                          alt={product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">
                          {product.name}
                        </h3>
                        <span className="inline-block px-2 py-0.5 text-xs font-medium text-cyan-700 bg-cyan-50 rounded-full">
                          {product.category}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(product.name)}
                        className="p-2 h-fit rounded-lg text-red-500 hover:bg-red-50 transition-all"
                        title="Remove from cart"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Clear Cart Button */}
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="mt-4 w-full md:w-auto px-4 py-2 rounded-lg text-red-600 border border-red-200 hover:bg-red-50 transition-all text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-1">
              <div className="glass-light rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">
                  Checkout
                </h2>

                <div className="space-y-4">
                  {/* Customer Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition-all"
                      placeholder="+977 9812345678"
                      required
                    />
                  </div>

                  {/* Order Summary */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                      <span>Total Items</span>
                      <span className="font-semibold">{cart.length}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full mt-6 px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Placing Order..."
                    ) : (
                      <>
                        <Send size={20} />
                        Place Order
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center mt-4">
                    We'll contact you shortly to confirm your order
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}