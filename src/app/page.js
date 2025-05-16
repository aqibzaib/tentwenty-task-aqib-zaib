import Image from "next/image";
import HeroBanner from "../../components/HeroBanner";

export default function Home() {
  return (
    <div className="h-[100vh] overflow-hidden">
      <HeroBanner />
    </div>
  );
}
