import Image from "next/image";
import HeroSection from "./component/herosection";
import ProductListing from "./component/product";

export default function Home() {
  return (
    <div className="min-h-screen ">

      <HeroSection />
      <ProductListing />
    </div>
    
  );
}
