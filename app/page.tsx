import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <header className="bg-white dark:bg-zinc-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Anukul Store
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Discover our amazing collection of products
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            All Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {products.length} products available
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <footer className="bg-white dark:bg-zinc-900 mt-16 border-t border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © 2026 Anukul Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
