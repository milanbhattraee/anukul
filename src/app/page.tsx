import Image from "next/image";
import HeroSection from "./component/herosection";
import ProductListing from "./component/product";
import Testimonials from "./component/testimonial";
import Contact from "./component/contact";

export default function Home() {
  return (
    <div className="min-h-screen ">

      <HeroSection />
      <ProductListing />
      <Testimonials />
      <Contact />
      
    </div>
    
  );
}
