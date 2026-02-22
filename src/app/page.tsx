import Image from "next/image";
import HeroSection from "./hero/page";
import NavBar from "@/components/Navbar";
import Timeline from "@/components/Timeline"; 
import PrizePool from "@/components/prizepool";
// import CountdownTimer from "@/components/CountdownTimer";
import Regcounter from "@/components/Regcounter";

export default function Home() {
  return (
    
    <div >
      <NavBar />

    <HeroSection />
    {/* <CountdownTimer /> */}
    <Regcounter />
    <PrizePool />
    <Timeline />

    </div>
    
  )
}
