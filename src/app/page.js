import Image from "next/image";
import HeroBanner from "./components/HeroBanner";

export default function Home() {
  return (
    // <div className="h-screen bg-[image:var(--hero-bg)] bg-cover bg-center">
    //   <h1 className="p-8 text-4xl font-bold text-white">hi</h1>
    //   <HeroBanner />
    // </div>
    <div className="h-screen">
      <h1 className="p-8 text-4xl font-bold text-white">hi</h1>
      <HeroBanner />
    </div>
  );
}
