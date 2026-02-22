import Image from "next/image";
import HeroSection from "./hero/page";
import NavBar from "@/components/Navbar";
import Timeline from "@/components/Timeline"; 
import PrizePool from "@/components/prizepool";
import Sponsor from "@/components/sponsor";
export default function Home() {
  return (
    
    <div >
      <NavBar />
    <HeroSection />
    <PrizePool />
    <Timeline />
    <Sponsor />
    </div>
    
  )
}
