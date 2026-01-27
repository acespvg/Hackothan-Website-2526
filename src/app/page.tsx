import Image from "next/image";
import HeroSection from "./hero/page";
import NavBar from "@/components/navbar/page";
export default function Home() {
  return (
    <>
    <NavBar />
    <HeroSection />
    </>
  )
}
