import Image from "next/image";
import HeroSection from "./hero/page";
import NavBar from "@/components/navbar/page";
import Timeline from "@/components/Timeline"; 
import PrizePool from "@/components/prizepool";

export default function Home() {
  return (
    
    <div >
      <NavBar />
    <HeroSection />
    <PrizePool />
    <Timeline />

    </div>
    
  )
}
