import HeroSection from "./hero/page";
import NavBar from "@/components/Navbar";
import Timeline from "@/components/Timeline";
import PrizePool from "@/components/prizepool";
import FAQ from "@/components/faq/FAQ";

export default function Home() {
  return (

    <div >
      <NavBar />
      <HeroSection />
      <PrizePool />
      <Timeline />
      <FAQ />

    </div>

  )
}
