import Image from "next/image";
import HeroBanner from "../../components/HeroBanner";
import ProductCarousel from "../../components/ProductCarousel";

export default function Home() {
  return (
    <div className="h-[100vh]">
      <HeroBanner />
      <ProductCarousel />
    </div>
  );
}
